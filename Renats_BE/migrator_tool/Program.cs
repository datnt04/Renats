using Npgsql;
var connStr = "Host=localhost;Port=5432;Database=Renats;Username=postgres;Password=123";
var stmts = new[] {
    "ALTER TABLE factories ADD COLUMN IF NOT EXISTS industrial_zone VARCHAR(255)",
    "ALTER TABLE factories ADD COLUMN IF NOT EXISTS primary_material_type TEXT",
    "ALTER TABLE factories ADD COLUMN IF NOT EXISTS accepted_material_types TEXT",
    "ALTER TABLE factories ADD COLUMN IF NOT EXISTS capacity_per_month_ton NUMERIC(12,2)",
    "ALTER TABLE factories ADD COLUMN IF NOT EXISTS min_purity_required NUMERIC(5,2)",
    "ALTER TABLE factories ADD COLUMN IF NOT EXISTS business_license_url TEXT",
    "ALTER TABLE factories ADD COLUMN IF NOT EXISTS environment_license_url TEXT",
    "ALTER TABLE factories ADD COLUMN IF NOT EXISTS is_profile_complete BOOLEAN NOT NULL DEFAULT FALSE",
    @"INSERT INTO ""__EFMigrationsHistory"" (""MigrationId"",""ProductVersion"") VALUES('20260606081651_AddFactoryProfileFields','8.0.0') ON CONFLICT(""MigrationId"") DO NOTHING",
    @"INSERT INTO ""__EFMigrationsHistory"" (""MigrationId"",""ProductVersion"") VALUES('20260606081921_AddFactoryProfileFields','8.0.0') ON CONFLICT(""MigrationId"") DO NOTHING"
};
using var conn = new NpgsqlConnection(connStr);
await conn.OpenAsync();
foreach (var s in stmts) {
    using var cmd = new NpgsqlCommand(s, conn);
    try {
        await cmd.ExecuteNonQueryAsync();
        Console.WriteLine("OK: " + s[..Math.Min(70, s.Length)]);
    } catch (Exception ex) {
        Console.WriteLine("SKIP: " + ex.Message[..Math.Min(90, ex.Message.Length)]);
    }
}
Console.WriteLine("=== Migration Done! ===");
