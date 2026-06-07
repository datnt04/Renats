-- Run this in pgAdmin Query Tool or any PostgreSQL client
-- Apply factory profile fields migration

ALTER TABLE factories ADD COLUMN IF NOT EXISTS industrial_zone VARCHAR(255);
ALTER TABLE factories ADD COLUMN IF NOT EXISTS primary_material_type TEXT;
ALTER TABLE factories ADD COLUMN IF NOT EXISTS accepted_material_types TEXT;
ALTER TABLE factories ADD COLUMN IF NOT EXISTS capacity_per_month_ton NUMERIC(12,2);
ALTER TABLE factories ADD COLUMN IF NOT EXISTS min_purity_required NUMERIC(5,2);
ALTER TABLE factories ADD COLUMN IF NOT EXISTS business_license_url TEXT;
ALTER TABLE factories ADD COLUMN IF NOT EXISTS environment_license_url TEXT;
ALTER TABLE factories ADD COLUMN IF NOT EXISTS is_profile_complete BOOLEAN NOT NULL DEFAULT FALSE;

-- Register migration as applied
INSERT INTO "__EFMigrationsHistory" ("MigrationId","ProductVersion") 
VALUES('20260606081651_AddFactoryProfileFields','8.0.0') 
ON CONFLICT("MigrationId") DO NOTHING;

INSERT INTO "__EFMigrationsHistory" ("MigrationId","ProductVersion") 
VALUES('20260606081921_AddFactoryProfileFields','8.0.0') 
ON CONFLICT("MigrationId") DO NOTHING;

SELECT column_name FROM information_schema.columns 
WHERE table_name = 'factories' ORDER BY ordinal_position;
