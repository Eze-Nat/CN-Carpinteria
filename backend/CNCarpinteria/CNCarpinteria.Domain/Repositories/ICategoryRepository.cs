using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using CNCarpinteria.Domain.Entities;

namespace CNCarpinteria.Domain.Repositories;

public interface ICategoryRepository
{
    Task<List<Category>> GetAllAsync();
    Task<Category?> GetByIdAsync(Guid id);
    Task AddAsync(Category category);
    Task<bool> ExistsByNameAsync(string name);
    Task DeleteAsync(Guid id);
}