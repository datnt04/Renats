using Microsoft.AspNetCore.Mvc;
using Renats_BE.DTOs.Seller;
using Renats_BE.Services.Interfaces;

namespace Renats_BE.Controllers.Seller;

[ApiController]
[Route("api/seller/requests")]
public class SellerRequestController : ControllerBase
{
    private readonly IPickupRequestService _service;
    public SellerRequestController(IPickupRequestService service) => _service = service;

    /// <summary>Lấy danh sách yêu cầu thu gom của seller</summary>
    [HttpGet]
    public async Task<IActionResult> GetRequests([FromQuery] Guid sellerId, [FromQuery] string? status)
    {
        if (sellerId == Guid.Empty) return BadRequest("sellerId is required");
        var result = await _service.GetRequestsAsync(sellerId, status);
        return Ok(result);
    }

    /// <summary>Chi tiết một yêu cầu thu gom</summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetDetail(Guid id)
    {
        var result = await _service.GetRequestDetailAsync(id);
        return result is null ? NotFound() : Ok(result);
    }

    /// <summary>Tạo yêu cầu thu gom mới</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePickupRequestDto dto)
    {
        try
        {
            var result = await _service.CreateRequestAsync(dto);
            return CreatedAtAction(nameof(GetDetail), new { id = result.RequestId }, result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    /// <summary>Hủy yêu cầu (chỉ khi đang PENDING)</summary>
    [HttpPatch("{id:guid}/cancel")]
    public async Task<IActionResult> Cancel(Guid id)
    {
        var ok = await _service.CancelRequestAsync(id);
        if (!ok) return BadRequest("Không thể hủy yêu cầu này");
        return Ok(new { message = "Yêu cầu đã được hủy" });
    }
}
