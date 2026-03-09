using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private static List<TaskItem> tasks = new()
    {
        new TaskItem
        {
            Id = 1,
            Title = "Learn C#",
            Description = "Understand basic syntax",
            IsCompleted = false
        },
        new TaskItem
        {
            Id = 2,
            Title = "Build ToDo API",
            Description = "Create first backend project",
            IsCompleted = false
        }
    };

    [HttpGet]
    public IActionResult GetTasks()
    {
        return Ok(tasks);
    }
}