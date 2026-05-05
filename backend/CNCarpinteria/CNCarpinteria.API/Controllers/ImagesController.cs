using CNCarpinteria.Application.DTOs;
using CNCarpinteria.Application.Services;
using CNCarpinteria.Domain.Entities;
using CNCarpinteria.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CNCarpinteria.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImagesController : ControllerBase
{
    private readonly IImageRepository _repository;
    private readonly ICloudinaryService _cloudinary;

    public ImagesController(IImageRepository repository, ICloudinaryService cloudinary)
    {
        _repository = repository;
        _cloudinary = cloudinary;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var images = await _repository.GetAllAsync();
        var result = images.Select(i => new
        {
            id = i.Id,
            url = i.Url,
            description = i.Description,
            categoryId = i.CategoryId
        });
        return Ok(result);
    }

    [HttpGet("category/{categoryId}")]
    public async Task<IActionResult> GetByCategory(Guid categoryId)
    {
        var images = await _repository.GetByCategoryAsync(categoryId);
        var result = images.Select(i => new
        {
            id = i.Id,
            url = i.Url,
            description = i.Description,
            categoryId = i.CategoryId
        });
        return Ok(result);
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file, [FromForm] Guid categoryId, [FromForm] string? description)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No se proporcionó ningún archivo.");

        using var stream = file.OpenReadStream();
        var url = await _cloudinary.UploadImageAsync(stream, file.FileName);

        var image = new Image
        {
            Id = Guid.NewGuid(),
            Url = url,
            Description = description,
            CategoryId = categoryId
        };

        var created = await _repository.AddAsync(image);

        return Ok(new
        {
            id = created.Id,
            url = created.Url,
            description = created.Description,
            categoryId = created.CategoryId
        });
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

        return Ok(new
        {
            id = created.Id,
            url = created.Url,
            description = created.Description,
            categoryId = created.CategoryId
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}
