using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using CNCarpinteria.Application.Services;
using Microsoft.Extensions.Configuration;

namespace CNCarpinteria.Infrastructure.Services;

public class CloudinaryService : ICloudinaryService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryService(IConfiguration configuration)
    {
        var account = new Account(
            configuration["Cloudinary:CloudName"],
            configuration["Cloudinary:ApiKey"],
            configuration["Cloudinary:ApiSecret"]
        );
        _cloudinary = new Cloudinary(account);
        _cloudinary.Api.Secure = true;
    }

    public async Task<string> UploadImageAsync(Stream fileStream, string fileName)
    {
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(fileName, fileStream),
            Folder = "cn-carpinteria",
            UseFilename = true,
            UniqueFilename = true,
            Overwrite = false
        };

        var result = await _cloudinary.UploadAsync(uploadParams);

        if (result.Error != null)
            throw new Exception($"Error al subir imagen a Cloudinary: {result.Error.Message}");

        return result.SecureUrl.ToString();
    }

    public async Task<string> UploadVideoAsync(Stream fileStream, string fileName)
    {
        var uploadParams = new VideoUploadParams
        {
            File = new FileDescription(fileName, fileStream),
            Folder = "cn-carpinteria/reels",
            UseFilename = true,
            UniqueFilename = true,
            Overwrite = false
        };

        var result = await _cloudinary.UploadAsync(uploadParams);

        if (result.Error != null)
            throw new Exception($"Error al subir video a Cloudinary: {result.Error.Message}");

        return result.SecureUrl.ToString();
    }
}
