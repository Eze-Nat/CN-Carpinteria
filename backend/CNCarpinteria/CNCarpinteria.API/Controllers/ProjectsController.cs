using CNCarpinteria.Application.DTOs;
using CNCarpinteria.Application.Services;
using CNCarpinteria.Domain.Entities;
using CNCarpinteria.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CNCarpinteria.API.Controllers;

// Clases con property setters para que [FromForm] las pueda bindear
public class CreateProjectRequest
{
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public Guid CategoryId { get; set; }
    public string? CoverImageUrl { get; set; }
}

public class UpdateProjectRequest
{
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public string? CoverImageUrl { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectRepository _projectRepository;
    private readonly ICloudinaryService _cloudinaryService;

    public ProjectsController(IProjectRepository projectRepository, ICloudinaryService cloudinaryService)
    {
        _projectRepository = projectRepository;
        _cloudinaryService = cloudinaryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var projects = await _projectRepository.GetAllAsync();
        return Ok(projects.Select(ToDto));
    }

    [HttpGet("category/{slug}")]
    public async Task<IActionResult> GetByCategorySlug(string slug)
    {
        var projects = await _projectRepository.GetByCategorySlugAsync(slug);
        return Ok(projects.Select(ToDto));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null) return NotFound();
        return Ok(ToDetailDto(project));
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create([FromForm] CreateProjectRequest req, IFormFile? coverImage)
    {
        if (string.IsNullOrWhiteSpace(req.Name))
            return BadRequest("El nombre del proyecto es obligatorio.");

        if (req.CategoryId == Guid.Empty)
            return BadRequest("CategoryId inválido.");

        string coverImageUrl = req.CoverImageUrl ?? "";

        if (coverImage != null && coverImage.Length > 0)
        {
            using var stream = coverImage.OpenReadStream();
            coverImageUrl = await _cloudinaryService.UploadImageAsync(stream, coverImage.FileName);
        }

        var project = new Project
        {
            Id = Guid.NewGuid(),
            Name = req.Name,
            Description = req.Description,
            CategoryId = req.CategoryId,
            CoverImageUrl = coverImageUrl,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _projectRepository.AddAsync(project);
        var full = await _projectRepository.GetByIdAsync(created.Id);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, ToDetailDto(full!));
    }

    [HttpPut("{id:guid}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Update(Guid id, [FromForm] UpdateProjectRequest req, IFormFile? coverImage)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null) return NotFound();

        project.Name = req.Name;
        project.Description = req.Description;

        if (coverImage != null && coverImage.Length > 0)
        {
            using var stream = coverImage.OpenReadStream();
            project.CoverImageUrl = await _cloudinaryService.UploadImageAsync(stream, coverImage.FileName);
        }
        else if (!string.IsNullOrWhiteSpace(req.CoverImageUrl))
        {
            project.CoverImageUrl = req.CoverImageUrl;
        }

        await _projectRepository.UpdateAsync(project);
        var updated = await _projectRepository.GetByIdAsync(id);
        return Ok(ToDetailDto(updated!));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _projectRepository.DeleteAsync(id);
        return NoContent();
    }

    private static ProjectDto ToDto(Project p) => new(
        p.Id, p.Name, p.Description,
        p.CategoryId, p.Category?.Name ?? "", p.Category?.Slug ?? "",
        p.CoverImageUrl, p.CreatedAt
    );

    private static ProjectDetailDto ToDetailDto(Project p) => new(
        p.Id, p.Name, p.Description,
        p.CategoryId, p.Category?.Name ?? "", p.Category?.Slug ?? "",
        p.CoverImageUrl, p.CreatedAt,
        p.ProjectImages?.OrderBy(pi => pi.Order)
            .Select(pi => new ProjectImageDto(pi.Id, pi.ImageUrl, pi.Order))
            ?? Enumerable.Empty<ProjectImageDto>()
    );
}
