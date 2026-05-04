using CNCarpinteria.Domain.Entities;
using CNCarpinteria.Domain.Repositories;
using CNCarpinteria.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CNCarpinteria.Infrastructure.Repositories;

public class ProjectImageRepository : IProjectImageRepository
{
    private readonly AppDbContext _context;

    public ProjectImageRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ProjectImage?> GetByIdAsync(Guid id)
    {
        return await _context.ProjectImages.FindAsync(id);
    }

    public async Task<IEnumerable<ProjectImage>> GetByProjectIdAsync(Guid projectId)
    {
        return await _context.ProjectImages
            .Where(pi => pi.ProjectId == projectId)
            .OrderBy(pi => pi.Order)
            .ToListAsync();
    }

    public async Task<ProjectImage> AddAsync(ProjectImage projectImage)
    {
        _context.ProjectImages.Add(projectImage);
        await _context.SaveChangesAsync();
        return projectImage;
    }

    public async Task DeleteAsync(Guid id)
    {
        var image = await _context.ProjectImages.FindAsync(id);
        if (image != null)
        {
            _context.ProjectImages.Remove(image);
            await _context.SaveChangesAsync();
        }
    }
}
