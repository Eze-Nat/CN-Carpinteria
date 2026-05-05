namespace CNCarpinteria.Domain.Entities;

public class ProjectImage
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public Project? Project { get; set; }
    public string ImageUrl { get; set; } = "";
    public int Order { get; set; }
}
