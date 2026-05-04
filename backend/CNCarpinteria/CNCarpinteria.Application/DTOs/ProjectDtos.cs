namespace CNCarpinteria.Application.DTOs;

public record ProjectImageDto(Guid Id, string ImageUrl, int Order);

public record ProjectDto(
    Guid Id,
    string Name,
    string Description,
    Guid CategoryId,
    string CategoryName,
    string CategorySlug,
    string CoverImageUrl,
    DateTime CreatedAt
);

public record ProjectDetailDto(
    Guid Id,
    string Name,
    string Description,
    Guid CategoryId,
    string CategoryName,
    string CategorySlug,
    string CoverImageUrl,
    DateTime CreatedAt,
    IEnumerable<ProjectImageDto> Images
);

public record CreateProjectDto(
    string Name,
    string Description,
    Guid CategoryId,
    string CoverImageUrl
);

public record UpdateProjectDto(
    string Name,
    string Description,
    string CoverImageUrl
);
