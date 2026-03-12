using CNCarpinteria.Application.DTOs;
using CNCarpinteria.Domain.Entities;
using CNCarpinteria.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CNCarpinteria.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImagesController : ControllerBase
{
    private readonly IImageRepository _repository;

    public ImagesController(IImageRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var images = await _repository.GetAllAsync();
        return Ok(images);
    }

    [HttpGet("category/{categoryId}")]
    public async Task<IActionResult> GetByCategory(Guid categoryId)
    {
        var images = await _repository.GetByCategoryAsync(categoryId);
        return Ok(images);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateImageDto dto)
    {
        var image = new Image
        {
            Id = Guid.NewGuid(),
            Url = dto.Url,
            Description = dto.Description,
            CategoryId = dto.CategoryId
        };

        var created = await _repository.AddAsync(image);

        return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}
