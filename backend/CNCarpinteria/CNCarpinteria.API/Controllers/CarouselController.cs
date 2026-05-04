using CNCarpinteria.Application.Services;
using CNCarpinteria.Domain.Entities;
using CNCarpinteria.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CNCarpinteria.API.Controllers;

public class UpdateOrderRequest
{
    public int Order { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class CarouselController : ControllerBase
{
    private readonly ICarouselRepository _repo;
    private readonly ICloudinaryService _cloudinary;

    public CarouselController(ICarouselRepository repo, ICloudinaryService cloudinary)
    {
        _repo = repo;
        _cloudinary = cloudinary;
    }

    // GET /api/carousel — público, solo imágenes activas
    [HttpGet]
    public async Task<IActionResult> GetActive()
    {
        var images = await _repo.GetActiveAsync();
        return Ok(images.Select(ToDto));
    }

    // GET /api/carousel/all — admin, todas
    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        var images = await _repo.GetAllAsync();
        return Ok(images.Select(ToDto));
    }

    // POST /api/carousel/upload
    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Upload(IFormFile file, [FromForm] int order = 0)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Se requiere un archivo de imagen.");

        using var stream = file.OpenReadStream();
        var imageUrl = await _cloudinary.UploadImageAsync(stream, file.FileName);

        var image = new CarouselImage
        {
            Id = Guid.NewGuid(),
            ImageUrl = imageUrl,
            Order = order,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _repo.AddAsync(image);
        return Ok(ToDto(created));
    }

    // DELETE /api/carousel/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var image = await _repo.GetByIdAsync(id);
        if (image == null) return NotFound();
        await _repo.DeleteAsync(id);
        return NoContent();
    }

    // PUT /api/carousel/{id}/order
    [HttpPut("{id:guid}/order")]
    public async Task<IActionResult> UpdateOrder(Guid id, [FromBody] UpdateOrderRequest req)
    {
        var image = await _repo.GetByIdAsync(id);
        if (image == null) return NotFound();
        image.Order = req.Order;
        await _repo.UpdateAsync(image);
        return Ok(ToDto(image));
    }

    // PUT /api/carousel/{id}/toggle
    [HttpPut("{id:guid}/toggle")]
    public async Task<IActionResult> Toggle(Guid id)
    {
        var image = await _repo.GetByIdAsync(id);
        if (image == null) return NotFound();
        image.IsActive = !image.IsActive;
        await _repo.UpdateAsync(image);
        return Ok(ToDto(image));
    }

    private static object ToDto(CarouselImage c) => new
    {
        c.Id,
        c.ImageUrl,
        c.Order,
        c.IsActive,
        c.CreatedAt
    };
}
