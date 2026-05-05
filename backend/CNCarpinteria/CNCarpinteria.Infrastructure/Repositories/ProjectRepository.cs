using CNCarpinteria.Domain.Entities;
using CNCarpinteria.Domain.Repositories;
using CNCarpinteria.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CNCarpinteria.Infrastructure.Repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly AppDbContext _context;

    public ProjectRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Project>> GetAllAsync()
    {
        return await _context.Projects
            .Include(p => p.Category)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task<Project?> GetByIdAsync(Guid id)
    {
        return await _context.Projects
            .Include(p => p.Category)
            .Include(p => p.ProjectImages)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Project>> GetByCategoryIdAsync(Guid categoryId)
    {
        return await _context.Projects
            .Where(p => p.CategoryId == categoryId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<Project>> GetByCategorySlugAsync(string slug)
    {
        return await _context.Projects
            .Include(p => p.Category)
            .Where(p => p.Category!.Slug == slug)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task<Project> AddAsync(Project project)
    {
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
        return project;
    }

    public async Task<Project> UpdateAsync(Project project)
    {
        _context.Projects.Update(project);
        await _context.SaveChangesAsync();
        return project;
    }

    public async Task DeleteAsync(Guid id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project != null)
        {
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
        }
    }
}
