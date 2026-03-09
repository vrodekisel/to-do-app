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

    public List<TaskItem> GetAll()
    {
        return _context.Tasks.ToList();
    }

    public TaskItem Create(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            IsCompleted = dto.IsCompleted
            CreatedAt = DateTime.UtcNow
        };

        _context.Tasks.Add(task);
        _context.SaveChanges();

        return task;
    }

    public TaskItem? Update(int id, UpdateTaskDto dto)
    {
        var task = _context.Tasks.FirstOrDefault(t => t.Id == id);

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

    public bool Delete(int id)
    {
        var task = _context.Tasks.FirstOrDefault(t => t.Id == id);

        if (task == null)
        {
            return false;
        }

        _context.Tasks.Remove(task);
        _context.SaveChanges();

        return true;
    }
}