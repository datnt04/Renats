using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Renats_BE.Services.Interfaces;

namespace Renats_BE.Services;

public class CloudinaryService : ICloudinaryService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryService(IConfiguration config)
    {
        var cloudName  = config["CloudinarySettings:CloudName"]  ?? throw new InvalidOperationException("CloudinarySettings:CloudName missing");
        var apiKey     = config["CloudinarySettings:ApiKey"]     ?? throw new InvalidOperationException("CloudinarySettings:ApiKey missing");
        var apiSecret  = config["CloudinarySettings:ApiSecret"]  ?? throw new InvalidOperationException("CloudinarySettings:ApiSecret missing");

        var account    = new Account(cloudName, apiKey, apiSecret);
        _cloudinary    = new Cloudinary(account) { Api = { Secure = true } };
    }

    public async Task<string> UploadFileAsync(IFormFile file, string folder = "factory-documents")
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("File rỗng hoặc không hợp lệ.");

        await using var stream = file.OpenReadStream();

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();

        // PDF → raw upload; image → image upload
        if (ext == ".pdf")
        {
            var rawParams = new RawUploadParams
            {
                File   = new FileDescription(file.FileName, stream),
                Folder = folder,
                UseFilename = true,
                UniqueFilename = true
            };
            var rawResult = await _cloudinary.UploadAsync(rawParams);
            if (rawResult.Error != null)
                throw new Exception($"Cloudinary error: {rawResult.Error.Message}");
            return rawResult.SecureUrl.ToString();
        }
        else
        {
            var imgParams = new ImageUploadParams
            {
                File   = new FileDescription(file.FileName, stream),
                Folder = folder,
                UseFilename = true,
                UniqueFilename = true,
                // Tự động rotate theo EXIF
                Transformation = new Transformation().Quality("auto").FetchFormat("auto")
            };
            var imgResult = await _cloudinary.UploadAsync(imgParams);
            if (imgResult.Error != null)
                throw new Exception($"Cloudinary error: {imgResult.Error.Message}");
            return imgResult.SecureUrl.ToString();
        }
    }
}
