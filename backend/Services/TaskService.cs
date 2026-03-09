using backend.DTOs;
using backend.Models;

namespace backend.Services;

public class TaskService
{
    private readonly List<TaskItem> tasks = new()
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

    public List<TaskItem> GetTasks()
    {
        return tasks;
    }

    public TaskItem CreateTask(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Id = tasks.Max(t => t.Id) + 1,
            Title = dto.Title,
            Description = dto.Description,
            IsCompleted = false
        };

        tasks.Add(task);

        return task;
    }

    public TaskItem? UpdateTask(int id, UpdateTaskDto dto)
    {
        var task = tasks.FirstOrDefault(t => t.Id == id);

        if (task == null)
        {
            return null;
        }

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.IsCompleted = dto.IsCompleted;

        return task;
    }

    public bool DeleteTask(int id)
    {
        var task = tasks.FirstOrDefault(t => t.Id == id);

        if (task == null)
        {
            return false;
        }

        tasks.Remove(task);

        return true;
    }
}