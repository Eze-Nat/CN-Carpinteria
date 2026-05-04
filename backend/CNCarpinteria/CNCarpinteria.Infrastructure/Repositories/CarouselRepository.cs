using CNCarpinteria.Domain.Entities;
using CNCarpinteria.Domain.Repositories;
using CNCarpinteria.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CNCarpinteria.Infrastructure.Repositories;

public class CarouselRepository : ICarouselRepository
{
    private readonly AppDbContext _context;

    public CarouselRepository(AppDbContext context) => _context = context;

    public async Task<IEnumerable<CarouselImage>> GetAllAsync() =>
        await _context.CarouselImages.OrderBy(c => c.Order).ThenBy(c => c.CreatedAt).ToListAsync();

    public async Task<IEnumerable<CarouselImage>> GetActiveAsync() =>
        await _context.CarouselImages
            .Where(c => c.IsActive)
            .OrderBy(c => c.Order)
            .ThenBy(c => c.CreatedAt)
            .ToListAsync();

    public async Task<CarouselImage?> GetByIdAsync(Guid id) =>
        await _context.CarouselImages.FindAsync(id);

    public async Task<CarouselImage> AddAsync(CarouselImage image)
    {
        _context.CarouselImages.Add(image);
        await _context.SaveChangesAsync();
        return image;
    }

    public async Task UpdateAsync(CarouselImage image)
    {
        _context.CarouselImages.Update(image);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var image = await _context.CarouselImages.FindAsync(id);
        if (image != null)
        {
            _context.CarouselImages.Remove(image);
            await _context.SaveChangesAsync();
        }
    }
}
