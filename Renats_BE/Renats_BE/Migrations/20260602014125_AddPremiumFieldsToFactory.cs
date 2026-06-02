using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Renats_BE.Migrations
{
    /// <inheritdoc />
    public partial class AddPremiumFieldsToFactory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                ALTER TABLE factories 
                ADD COLUMN IF NOT EXISTS is_premium boolean NOT NULL DEFAULT false,
                ADD COLUMN IF NOT EXISTS premium_expires_at timestamp with time zone NULL;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
