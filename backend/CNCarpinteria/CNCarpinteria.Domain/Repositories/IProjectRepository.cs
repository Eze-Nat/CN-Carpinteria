using CNCarpinteria.Domain.Entities;

namespace CNCarpinteria.Domain.Repositories;

public interface IProjectRepository
{
    Task<IEnumerable<Project>> GetAllAsync();
    Task<Project?> GetByIdAsync(Guid id);
    Task<IEnumerable<Project>> GetByCategoryIdAsync(Guid categoryId);
    Task<IEnumerable<Project>> GetByCategorySlugAsync(string slug);
    Task<Project> AddAsync(Project project);
    Task<Project> UpdateAsync(Project project);
    Task DeleteAsync(Guid id);
}
