using CNCarpinteria.Domain.Entities;
using CNCarpinteria.Domain.Repositories;
using CNCarpinteria.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CNCarpinteria.Infrastructure.Repositories;

public class ReelRepository : IReelRepository
{
    private readonly AppDbContext _context;

    public ReelRepository(AppDbContext context) => _context = context;

    public async Task<IEnumerable<Reel>> GetAllAsync() =>
        await _context.Reels.OrderByDescending(r => r.CreatedAt).ToListAsync();

    public async Task<Reel> AddAsync(Reel reel)
    {
        _context.Reels.Add(reel);
        await _context.SaveChangesAsync();
        return reel;
    }

    public async Task DeleteAsync(Guid id)
    {
        var reel = await _context.Reels.FindAsync(id);
        if (reel != null)
        {
            _context.Reels.Remove(reel);
            await _context.SaveChangesAsync();
        }
    }
}
