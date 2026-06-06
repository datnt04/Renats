using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Renats_BE.Migrations
{
    /// <inheritdoc />
    public partial class AddFactoryProfileFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Thêm cột khu công nghiệp
            migrationBuilder.AddColumn<string>(
                name: "industrial_zone",
                table: "factories",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);

            // Loại vật liệu chính (TEXT, nullable)
            migrationBuilder.AddColumn<string>(
                name: "primary_material_type",
                table: "factories",
                type: "text",
                nullable: true);

            // Các loại vật liệu phụ, lưu dạng chuỗi CSV
            migrationBuilder.AddColumn<string>(
                name: "accepted_material_types",
                table: "factories",
                type: "text",
                nullable: true);

            // Công suất tái chế (tấn/tháng)
            migrationBuilder.AddColumn<decimal>(
                name: "capacity_per_month_ton",
                table: "factories",
                type: "numeric(12,2)",
                precision: 12,
                scale: 2,
                nullable: true);

            // Yêu cầu độ tinh khiết tối thiểu (%)
            migrationBuilder.AddColumn<decimal>(
                name: "min_purity_required",
                table: "factories",
                type: "numeric(5,2)",
                precision: 5,
                scale: 2,
                nullable: true);

            // URL giấy phép kinh doanh (Cloudinary)
            migrationBuilder.AddColumn<string>(
                name: "business_license_url",
                table: "factories",
                type: "text",
                nullable: true);

            // URL giấy phép môi trường (Cloudinary)
            migrationBuilder.AddColumn<string>(
                name: "environment_license_url",
                table: "factories",
                type: "text",
                nullable: true);

            // Trạng thái hoàn thiện hồ sơ
            migrationBuilder.AddColumn<bool>(
                name: "is_profile_complete",
                table: "factories",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "industrial_zone",          table: "factories");
            migrationBuilder.DropColumn(name: "primary_material_type",    table: "factories");
            migrationBuilder.DropColumn(name: "accepted_material_types",  table: "factories");
            migrationBuilder.DropColumn(name: "capacity_per_month_ton",   table: "factories");
            migrationBuilder.DropColumn(name: "min_purity_required",      table: "factories");
            migrationBuilder.DropColumn(name: "business_license_url",     table: "factories");
            migrationBuilder.DropColumn(name: "environment_license_url",  table: "factories");
            migrationBuilder.DropColumn(name: "is_profile_complete",      table: "factories");
        }
    }
}
