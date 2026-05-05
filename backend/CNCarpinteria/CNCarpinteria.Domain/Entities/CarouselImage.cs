namespace CNCarpinteria.Domain.Entities;

public class CarouselImage
{
    public Guid Id { get; set; }
    public string ImageUrl { get; set; } = "";
    public int Order { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
