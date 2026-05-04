using CNCarpinteria.Domain.Entities;

namespace CNCarpinteria.Domain.Repositories;

public interface ICarouselRepository
{
    Task<IEnumerable<CarouselImage>> GetAllAsync();
    Task<IEnumerable<CarouselImage>> GetActiveAsync();
    Task<CarouselImage?> GetByIdAsync(Guid id);
    Task<CarouselImage> AddAsync(CarouselImage image);
    Task UpdateAsync(CarouselImage image);
    Task DeleteAsync(Guid id);
}
