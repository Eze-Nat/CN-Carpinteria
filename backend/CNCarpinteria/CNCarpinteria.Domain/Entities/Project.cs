namespace CNCarpinteria.Domain.Entities;

public class Project
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public Guid CategoryId { get; set; }
    public Category? Category { get; set; }
    public string CoverImageUrl { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<ProjectImage>? ProjectImages { get; set; }
}