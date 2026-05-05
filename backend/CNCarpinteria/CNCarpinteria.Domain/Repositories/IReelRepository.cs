using CNCarpinteria.Domain.Entities;

namespace CNCarpinteria.Domain.Repositories;

public interface IReelRepository
{
    Task<IEnumerable<Reel>> GetAllAsync();
    Task<Reel> AddAsync(Reel reel);
    Task DeleteAsync(Guid id);
}
