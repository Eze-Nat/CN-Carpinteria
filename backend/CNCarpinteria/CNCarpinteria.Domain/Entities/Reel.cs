namespace CNCarpinteria.Domain.Entities;

public class Reel
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
