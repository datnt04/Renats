namespace Renats_BE.Models.Enums;

public enum PickupRequestStatus
{
    PENDING,      // Chờ kho xác nhận
    SCHEDULED,    // Kho đã xác nhận, đã đặt lịch đến
    WEIGHED,      // Đã cân xong, đang chờ seller xác nhận kết quả
    DONE,         // Hoàn tất
    CANCELLED     // Đã hủy
}
