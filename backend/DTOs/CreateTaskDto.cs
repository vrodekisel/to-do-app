using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class CreateTaskDto
{
    [Required(ErrorMessage = "TitleRequired")]
    [MinLength(1, ErrorMessage = "TitleRequired")]
    [RegularExpression(@"\S+", ErrorMessage = "TitleRequired")]
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}