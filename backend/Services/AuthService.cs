using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Services;

public class AuthService
{
    private readonly AppDbContext _context;
    private readonly PasswordHasher<User> _passwordHasher;

    public AuthService(AppDbContext context)
    {
        _context = context;
        _passwordHasher = new PasswordHasher<User>();
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
            .Any(user => user.Username.ToLower() == normalizedUsername.ToLower());

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

    private bool PasswordContainsLettersAndDigits(string password)
    {
        var hasLetter = password.Any(char.IsLetter);
        var hasDigit = password.Any(char.IsDigit);
        return hasLetter && hasDigit;
    }
}