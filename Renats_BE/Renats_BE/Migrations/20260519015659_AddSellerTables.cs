using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Renats_BE.Migrations
{
    /// <inheritdoc />
    public partial class AddSellerTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "sellers",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    default_address = table.Column<string>(type: "text", nullable: true),
                    city = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    province = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    latitude = table.Column<decimal>(type: "numeric(10,7)", precision: 10, scale: 7, nullable: true),
                    longitude = table.Column<decimal>(type: "numeric(10,7)", precision: 10, scale: 7, nullable: true),
                    bio = table.Column<string>(type: "text", nullable: true),
                    total_requests = table.Column<int>(type: "integer", nullable: false),
                    completed_requests = table.Column<int>(type: "integer", nullable: false),
                    average_rating = table.Column<decimal>(type: "numeric(3,2)", precision: 3, scale: 2, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sellers", x => x.id);
                    table.ForeignKey(
                        name: "FK_sellers_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "pickup_requests",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    request_code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    seller_id = table.Column<Guid>(type: "uuid", nullable: false),
                    assigned_depot_id = table.Column<Guid>(type: "uuid", nullable: true),
                    pickup_address = table.Column<string>(type: "text", nullable: false),
                    city = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    latitude = table.Column<decimal>(type: "numeric(10,7)", precision: 10, scale: 7, nullable: true),
                    longitude = table.Column<decimal>(type: "numeric(10,7)", precision: 10, scale: 7, nullable: true),
                    pickup_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    pickup_slot = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    note = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "text", nullable: false),
                    scheduled_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    weighed_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    completed_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pickup_requests", x => x.id);
                    table.ForeignKey(
                        name: "FK_pickup_requests_depots_assigned_depot_id",
                        column: x => x.assigned_depot_id,
                        principalTable: "depots",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_pickup_requests_sellers_seller_id",
                        column: x => x.seller_id,
                        principalTable: "sellers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "pickup_request_images",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    pickup_request_id = table.Column<Guid>(type: "uuid", nullable: false),
                    image_url = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pickup_request_images", x => x.id);
                    table.ForeignKey(
                        name: "FK_pickup_request_images_pickup_requests_pickup_request_id",
                        column: x => x.pickup_request_id,
                        principalTable: "pickup_requests",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "pickup_request_items",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    pickup_request_id = table.Column<Guid>(type: "uuid", nullable: false),
                    material_id = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    material_label = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    material_emoji = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pickup_request_items", x => x.id);
                    table.ForeignKey(
                        name: "FK_pickup_request_items_pickup_requests_pickup_request_id",
                        column: x => x.pickup_request_id,
                        principalTable: "pickup_requests",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "pickup_results",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    pickup_request_id = table.Column<Guid>(type: "uuid", nullable: false),
                    material_label = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    weight_kg = table.Column<decimal>(type: "numeric(10,3)", precision: 10, scale: 3, nullable: false),
                    price_per_kg = table.Column<decimal>(type: "numeric(14,2)", precision: 14, scale: 2, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pickup_results", x => x.id);
                    table.ForeignKey(
                        name: "FK_pickup_results_pickup_requests_pickup_request_id",
                        column: x => x.pickup_request_id,
                        principalTable: "pickup_requests",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_pickup_request_images_pickup_request_id",
                table: "pickup_request_images",
                column: "pickup_request_id");

            migrationBuilder.CreateIndex(
                name: "IX_pickup_request_items_pickup_request_id",
                table: "pickup_request_items",
                column: "pickup_request_id");

            migrationBuilder.CreateIndex(
                name: "idx_pickup_requests_seller",
                table: "pickup_requests",
                column: "seller_id");

            migrationBuilder.CreateIndex(
                name: "idx_pickup_requests_status",
                table: "pickup_requests",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "IX_pickup_requests_assigned_depot_id",
                table: "pickup_requests",
                column: "assigned_depot_id");

            migrationBuilder.CreateIndex(
                name: "IX_pickup_requests_request_code",
                table: "pickup_requests",
                column: "request_code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_pickup_results_pickup_request_id",
                table: "pickup_results",
                column: "pickup_request_id");

            migrationBuilder.CreateIndex(
                name: "IX_sellers_user_id",
                table: "sellers",
                column: "user_id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "pickup_request_images");

            migrationBuilder.DropTable(
                name: "pickup_request_items");

            migrationBuilder.DropTable(
                name: "pickup_results");

            migrationBuilder.DropTable(
                name: "pickup_requests");

            migrationBuilder.DropTable(
                name: "sellers");
        }
    }
}
