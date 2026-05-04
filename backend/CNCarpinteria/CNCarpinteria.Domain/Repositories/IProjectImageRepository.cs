using CNCarpinteria.Domain.Entities;

namespace CNCarpinteria.Domain.Repositories;

public interface IProjectImageRepository
{
    Task<ProjectImage?> GetByIdAsync(Guid id);
    Task<IEnumerable<ProjectImage>> GetByProjectIdAsync(Guid projectId);
    Task<ProjectImage> AddAsync(ProjectImage projectImage);
    Task DeleteAsync(Guid id);
}
