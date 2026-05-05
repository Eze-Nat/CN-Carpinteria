using CNCarpinteria.Application.Services;
using CNCarpinteria.Infrastructure.Persistence;
using CNCarpinteria.Infrastructure.Repositories;
using CNCarpinteria.Infrastructure.Services;
using CNCarpinteria.Domain.Repositories;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:5173",
                "https://cncarpinteria.netlify.app",
                "https://cncarpinteria.com.ar",
                "https://www.cncarpinteria.com.ar"
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// Allow large multipart uploads (for video files)
builder.Services.Configure<FormOptions>(o =>
{
    o.MultipartBodyLengthLimit = 500_000_000; // 500 MB
});

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IProjectImageRepository, ProjectImageRepository>();
builder.Services.AddScoped<IReelRepository, ReelRepository>();
builder.Services.AddScoped<ICarouselRepository, CarouselRepository>();
builder.Services.AddScoped<ICloudinaryService, CloudinaryService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
