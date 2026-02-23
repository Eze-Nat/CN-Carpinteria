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

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Category>> GetAllAsync()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(Guid id)
    {
        return await _context.Categories.FindAsync(id);
    }

    public async Task AddAsync(Category category)
    {
        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsByNameAsync(string name)
    {
        return await _context.Categories
            .AnyAsync(c => c.Name.ToLower() == name.ToLower());
    }

    public async Task DeleteAsync(Guid id)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category == null)
            return;

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
    }
}
