using Microsoft.AspNetCore.Mvc;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace Renats_BE.Controllers.Shared;

[ApiController]
[Route("api/shared/upload")]
public class ImageUploadController : ControllerBase
{
    private readonly Cloudinary _cloudinary;

    public ImageUploadController(IConfiguration config)
    {
        var cloudName = config["CloudinarySettings:CloudName"];
        var apiKey = config["CloudinarySettings:ApiKey"];
        var apiSecret = config["CloudinarySettings:ApiSecret"];

        if (string.IsNullOrEmpty(cloudName) || string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(apiSecret))
        {
            throw new ArgumentException("Cloudinary settings are missing or incomplete in appsettings.json.");
        }

        var account = new Account(cloudName, apiKey, apiSecret);
        _cloudinary = new Cloudinary(account);
    }

    [HttpPost]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file was uploaded.");
        }

        // Validate that file is indeed an image
        if (!file.ContentType.StartsWith("image/"))
        {
            return BadRequest("Uploaded file is not a valid image.");
        }

        try
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = "renats_seller"
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
            {
                return BadRequest(uploadResult.Error.Message);
            }

            return Ok(new { url = uploadResult.SecureUrl.ToString() });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
