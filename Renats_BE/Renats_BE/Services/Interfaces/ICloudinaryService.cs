namespace Renats_BE.Services.Interfaces;

public interface ICloudinaryService
{
    /// <summary>Upload một file lên Cloudinary và trả về URL công khai.</summary>
    Task<string> UploadFileAsync(IFormFile file, string folder = "factory-documents");
}
