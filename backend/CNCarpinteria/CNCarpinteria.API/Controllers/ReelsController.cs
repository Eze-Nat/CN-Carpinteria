using CNCarpinteria.Application.Services;
using CNCarpinteria.Domain.Entities;
using CNCarpinteria.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CNCarpinteria.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReelsController : ControllerBase
{
    private readonly IReelRepository _repository;
    private readonly ICloudinaryService _cloudinary;

    public ReelsController(IReelRepository repository, ICloudinaryService cloudinary)
    {
        _repository = repository;
        _cloudinary = cloudinary;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var reels = await _repository.GetAllAsync();
        return Ok(reels.Select(r => new
        {
            id = r.Id,
            title = r.Title,
            videoUrl = r.VideoUrl,
            thumbnailUrl = r.ThumbnailUrl,
            createdAt = r.CreatedAt
        }));
    }

    [HttpPost("upload")]
    [RequestSizeLimit(500_000_000)] // 500 MB
    public async Task<IActionResult> Upload([FromForm] IFormFile file, [FromForm] string title)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No se proporcionó ningún archivo.");

        if (string.IsNullOrWhiteSpace(title))
            return BadRequest("El título es requerido.");

        using var stream = file.OpenReadStream();
        var videoUrl = await _cloudinary.UploadVideoAsync(stream, file.FileName);
        var thumbnailUrl = BuildThumbnailUrl(videoUrl);

        var reel = new Reel
        {
            Id = Guid.NewGuid(),
            Title = title,
            VideoUrl = videoUrl,
            ThumbnailUrl = thumbnailUrl,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _repository.AddAsync(reel);

        return Ok(new
        {
            id = created.Id,
            title = created.Title,
            videoUrl = created.VideoUrl,
            thumbnailUrl = created.ThumbnailUrl,
            createdAt = created.CreatedAt
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }

    private static string BuildThumbnailUrl(string videoUrl)
    {
        // Insert Cloudinary transformation to capture frame at 2s as JPEG thumbnail
        var thumb = videoUrl
            .Replace("/video/upload/", "/video/upload/so_2,w_600,h_400,c_fill,q_auto/");

        foreach (var ext in new[] { ".mp4", ".mov", ".webm", ".avi", ".mkv" })
            thumb = thumb.Replace(ext, ".jpg");

        return thumb;
    }
}
