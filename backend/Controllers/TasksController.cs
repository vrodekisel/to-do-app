using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
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
            Title = "Laura Palmer case",
            Description = "Investigate the mysterious murder of Laura Palmer",
            IsCompleted = false
        },
        new TaskItem
        {
            Id = 2,
            Title = "Find a lawyer",
            Description = "Better call Saul",
            IsCompleted = false
        }
    };

    [HttpGet]
    public IActionResult GetTasks()
    {
        return Ok(tasks);
    }

    [HttpPost]
    public IActionResult CreateTask(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Id = tasks.Max(t => t.Id) + 1,
            Title = dto.Title,
            Description = dto.Description,
            IsCompleted = false
        };

        tasks.Add(task);

        return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id, UpdateTaskDto dto)
    {
        var task = tasks.FirstOrDefault(t => t.Id == id);

        if (task == null)
        {
            return NotFound();
        }

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.IsCompleted = dto.IsCompleted;

        return Ok(task);
    }
}