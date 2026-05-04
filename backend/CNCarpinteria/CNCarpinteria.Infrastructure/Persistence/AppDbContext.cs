using Microsoft.EntityFrameworkCore;
using CNCarpinteria.Domain.Entities;

namespace CNCarpinteria.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Image> Images { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<ProjectImage> ProjectImages { get; set; }
    public DbSet<Reel> Reels { get; set; }
    public DbSet<CarouselImage> CarouselImages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Name).IsRequired().HasMaxLength(100);
            entity.Property(c => c.Slug).IsRequired().HasMaxLength(150);
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Name).IsRequired().HasMaxLength(200);
            entity.Property(p => p.Description).HasMaxLength(1000);
            entity.Property(p => p.CoverImageUrl).IsRequired();
            entity.Property(p => p.CreatedAt).IsRequired();
            entity.HasOne(p => p.Category)
                  .WithMany()
                  .HasForeignKey(p => p.CategoryId)
                  .OnDelete(DeleteBehavior.Cascade);
            entity.HasMany(p => p.ProjectImages)
                  .WithOne(pi => pi.Project)
                  .HasForeignKey(pi => pi.ProjectId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ProjectImage>(entity =>
        {
            entity.HasKey(pi => pi.Id);
            entity.Property(pi => pi.ImageUrl).IsRequired();
            entity.Property(pi => pi.Order).IsRequired();
        });

        modelBuilder.Entity<Reel>(entity =>
        {
            entity.HasKey(r => r.Id);
            entity.Property(r => r.Title).IsRequired().HasMaxLength(200);
            entity.Property(r => r.VideoUrl).IsRequired();
            entity.Property(r => r.CreatedAt).IsRequired();
        });

        modelBuilder.Entity<CarouselImage>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.ImageUrl).IsRequired();
            entity.Property(c => c.Order).IsRequired();
            entity.Property(c => c.IsActive).IsRequired();
            entity.Property(c => c.CreatedAt).IsRequired();
        });
    }
}
