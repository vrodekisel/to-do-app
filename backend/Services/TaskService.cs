using backend.Data;
using backend.DTOs;
using backend.Models;

namespace backend.Services;

public class TaskService
{
    private readonly AppDbContext _context;

    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    public List<TaskItem> GetAll(int userId)
    {
        return _context.Tasks
            .Where(task => task.UserId == userId)
            .OrderBy(task => task.IsCompleted)
            .ThenByDescending(task => task.CreatedAt)
            .ToList();
    }

    public TaskItem Create(CreateTaskDto dto, int userId)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            IsCompleted = dto.IsCompleted,
            CreatedAt = DateTime.UtcNow,
            UserId = userId
        };

        _context.Tasks.Add(task);
        _context.SaveChanges();

        return task;
    }

    public TaskItem? Update(int id, UpdateTaskDto dto, int userId)
    {
        var task = _context.Tasks.FirstOrDefault(task =>
            task.Id == id && task.UserId == userId);

        if (task == null)
        {
            return null;
        }

        task.Title = dto.Title;
        task.IsCompleted = dto.IsCompleted;
        task.Description = dto.Description;

        _context.SaveChanges();

        return task;
    }

    public bool Delete(int id, int userId)
    {
        var task = _context.Tasks.FirstOrDefault(task =>
            task.Id == id && task.UserId == userId);

        if (task == null)
        {
            return false;
        }

        _context.Tasks.Remove(task);
        _context.SaveChanges();

        return true;
    }
}