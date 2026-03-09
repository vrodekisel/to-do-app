using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskService taskService;

    public TasksController(TaskService taskService)
    {
        this.taskService = taskService;
    }

    // GET /api/tasks
    [HttpGet]
    public IActionResult GetTasks()
    {
        var tasks = taskService.GetTasks();
        return Ok(tasks);
    }

    // POST /api/tasks
    [HttpPost]
    public IActionResult CreateTask(CreateTaskDto dto)
    {
        var task = taskService.CreateTask(dto);
        return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
    }

    // PUT /api/tasks/{id}
    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id, UpdateTaskDto dto)
    {
        var task = taskService.UpdateTask(id, dto);

        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    // PUT /api/tasks/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        var isDeleted = taskService.DeleteTask(id);

        if (!isDeleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}