using CNCarpinteria.Application.DTOs;
using CNCarpinteria.Application.Services;
using CNCarpinteria.Domain.Entities;
using CNCarpinteria.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CNCarpinteria.API.Controllers;

[ApiController]
[Route("api")]
public class ProjectImagesController : ControllerBase
{
    private readonly IProjectImageRepository _projectImageRepository;
    private readonly IProjectRepository _projectRepository;
    private readonly ICloudinaryService _cloudinaryService;

    public ProjectImagesController(
        IProjectImageRepository projectImageRepository,
        IProjectRepository projectRepository,
        ICloudinaryService cloudinaryService)
    {
        _projectImageRepository = projectImageRepository;
        _projectRepository = projectRepository;
        _cloudinaryService = cloudinaryService;
    }

    // POST /api/projects/{projectId}/images
    [HttpPost("projects/{projectId:guid}/images")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> AddImage(Guid projectId, IFormFile file, [FromForm] int order = 0)
    {
        var project = await _projectRepository.GetByIdAsync(projectId);
        if (project == null) return NotFound("Proyecto no encontrado.");

        if (file == null || file.Length == 0)
            return BadRequest("Se requiere un archivo de imagen.");

        using var stream = file.OpenReadStream();
        var imageUrl = await _cloudinaryService.UploadImageAsync(stream, file.FileName);

        var projectImage = new ProjectImage
        {
            Id = Guid.NewGuid(),
            ProjectId = projectId,
            ImageUrl = imageUrl,
            Order = order
        };

        var created = await _projectImageRepository.AddAsync(projectImage);
        return Ok(new ProjectImageDto(created.Id, created.ImageUrl, created.Order));
    }

    // DELETE /api/project-images/{id}
    [HttpDelete("project-images/{id:guid}")]
    public async Task<IActionResult> DeleteImage(Guid id)
    {
        var image = await _projectImageRepository.GetByIdAsync(id);
        if (image == null) return NotFound();

        await _projectImageRepository.DeleteAsync(id);
        return NoContent();
    }
}
