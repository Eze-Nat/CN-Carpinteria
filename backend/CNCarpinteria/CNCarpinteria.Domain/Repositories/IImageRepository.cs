using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using CNCarpinteria.Domain.Entities;

namespace CNCarpinteria.Domain.Repositories;

public interface IImageRepository
{
    Task<IEnumerable<Image>> GetAllAsync();

    Task<IEnumerable<Image>> GetByCategoryAsync(Guid categoryId);

    Task<Image> AddAsync(Image image);

    Task DeleteAsync(Guid id);
}
