using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using CNCarpinteria.Domain.Entities;
using CNCarpinteria.Domain.Repositories;
using CNCarpinteria.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CNCarpinteria.Infrastructure.Repositories;

public class ImageRepository : IImageRepository
{
    private readonly AppDbContext _context;

    public ImageRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Image>> GetAllAsync()
    {
        return await _context.Images
            .Include(i => i.Category)
            .ToListAsync();
    }

    public async Task<IEnumerable<Image>> GetByCategoryAsync(Guid categoryId)
    {
        return await _context.Images
            .Where(i => i.CategoryId == categoryId)
            .ToListAsync();
    }

    public async Task<Image> AddAsync(Image image)
    {
        _context.Images.Add(image);
        await _context.SaveChangesAsync();
        return image;
    }

    public async Task DeleteAsync(Guid id)
    {
        var image = await _context.Images.FindAsync(id);

        if (image != null)
        {
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();
        }
    }
}
