using CNCarpinteria.API.DTOs;
using CNCarpinteria.Domain.Entities;
using CNCarpinteria.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CNCarpinteria.API.Controllers;
using CNCarpinteria.API.DTOs;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _repository;

    public CategoriesController(ICategoryRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<List<Category>>> GetAll()
    {
        var categories = await _repository.GetAllAsync();
        return Ok(categories);
    }



    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateCategoryDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name))
            return BadRequest("El nombre es obligatorio.");

        var exists = await _repository.ExistsByNameAsync(dto.Name);

        if (exists)
            return Conflict("Ya existe una categoría con ese nombre.");

        var category = new Category(dto.Name);

        await _repository.AddAsync(category);

        return CreatedAtAction(nameof(GetAll), new { id = category.Id }, category);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var category = await _repository.GetByIdAsync(id);

        if (category == null)
            return NotFound();

        await _repository.DeleteAsync(id);

        return NoContent();
    }
}