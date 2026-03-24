using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services;

public class AuthService
{
    private readonly AppDbContext _context;
    private readonly PasswordHasher<User> _passwordHasher;
    private readonly IConfiguration _configuration;

    public AuthService(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _passwordHasher = new PasswordHasher<User>();
        _configuration = configuration;
    }

    public User Register(RegisterUserDto dto)
    {
        var normalizedUsername = dto.Username.Trim();

        if (string.IsNullOrWhiteSpace(normalizedUsername))
        {
            throw new InvalidOperationException("errors.usernameIsRequired");
        }

        if (string.IsNullOrWhiteSpace(dto.Password))
        {
            throw new InvalidOperationException("errors.passwordIsRequired");
        }

        if (dto.Password.Length < 8)
        {
            throw new InvalidOperationException("errors.passwordTooShort");
        }

        if (dto.Password != dto.RepeatPassword)
        {
            throw new InvalidOperationException("errors.passwordsDoNotMatch");
        }

        if (!PasswordContainsLettersAndDigits(dto.Password))
        {
            throw new InvalidOperationException("errors.passwordMustContainLettersAndDigits");
        }

        var userExists = _context.Users
            .Any(user => user.Username == normalizedUsername);

        if (userExists)
        {
            throw new InvalidOperationException("errors.usernameAlreadyExists");
        }

        var user = new User
        {
            Username = normalizedUsername,
            CreatedAt = DateTime.UtcNow
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

        _context.Users.Add(user);
        _context.SaveChanges();

        return user;
    }

    public AuthResponseDto Login(LoginUserDto dto)
    {
        var normalizedUsername = dto.Username.Trim();

        if (string.IsNullOrWhiteSpace(normalizedUsername))
        {
            throw new InvalidOperationException("errors.usernameIsRequired");
        }

        if (string.IsNullOrWhiteSpace(dto.Password))
        {
            throw new InvalidOperationException("errors.passwordIsRequired");
        }

        var user = _context.Users
            .FirstOrDefault(user => user.Username == normalizedUsername);

        if (user is null)
        {
            throw new InvalidOperationException("errors.invalidUsernameOrPassword");
        }

        var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            dto.Password
        );

        if (passwordVerificationResult == PasswordVerificationResult.Failed)
        {
            throw new InvalidOperationException("errors.invalidUsernameOrPassword");
        }

        var token = GenerateJwtToken(user);

        return new AuthResponseDto
        {
            Username = user.Username,
            Token = token
        };
    }

    private string GenerateJwtToken(User user)
    {
        var jwtKey = _configuration["Jwt:Key"];
        var jwtIssuer = _configuration["Jwt:Issuer"];
        var jwtAudience = _configuration["Jwt:Audience"];
        var expiresInMinutesValue = _configuration["Jwt:ExpiresInMinutes"];

        if (string.IsNullOrWhiteSpace(jwtKey) ||
            string.IsNullOrWhiteSpace(jwtIssuer) ||
            string.IsNullOrWhiteSpace(jwtAudience) ||
            string.IsNullOrWhiteSpace(expiresInMinutesValue))
        {
            throw new InvalidOperationException("JWT settings are not configured correctly.");
        }

        if (!double.TryParse(expiresInMinutesValue, out var expiresInMinutes))
        {
            throw new InvalidOperationException("JWT expiration settings are invalid.");
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        };

        var signingKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtKey)
        );

        var signingCredentials = new SigningCredentials(
            signingKey,
            SecurityAlgorithms.HmacSha256
        );

        var tokenDescriptor = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiresInMinutes),
            signingCredentials: signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }

    private bool PasswordContainsLettersAndDigits(string password)
    {
        var hasLetter = password.Any(char.IsLetter);
        var hasDigit = password.Any(char.IsDigit);

        return hasLetter && hasDigit;
    }
}