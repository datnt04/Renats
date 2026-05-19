-- =====================================================
-- FIX: Chuyển tất cả cột ENUM sang TEXT
-- để tương thích với EF Core HasConversion<string>()
-- Chạy script này 1 lần trên database đã tồn tại
-- =====================================================

-- Bước 1: Thêm SELLER vào user_role enum (nếu chưa có)
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'SELLER';

-- Bước 2: Chuyển tất cả cột enum → TEXT
ALTER TABLE users
    ALTER COLUMN role TYPE TEXT USING role::TEXT;

ALTER TABLE inventory_batches
    ALTER COLUMN material_type   TYPE TEXT USING material_type::TEXT,
    ALTER COLUMN status          TYPE TEXT USING status::TEXT,
    ALTER COLUMN transport_type  TYPE TEXT USING transport_type::TEXT;

ALTER TABLE batch_bids
    ALTER COLUMN status TYPE TEXT USING status::TEXT;

ALTER TABLE batch_orders
    ALTER COLUMN status TYPE TEXT USING status::TEXT;

ALTER TABLE transport_jobs
    ALTER COLUMN status TYPE TEXT USING status::TEXT;

ALTER TABLE invoices
    ALTER COLUMN status TYPE TEXT USING status::TEXT;

-- (Tuỳ chọn) Xoá các ENUM type cũ không còn dùng
-- DROP TYPE IF EXISTS user_role;
-- DROP TYPE IF EXISTS batch_status;
-- DROP TYPE IF EXISTS transport_status;
-- DROP TYPE IF EXISTS material_type;
-- DROP TYPE IF EXISTS bid_status;
-- DROP TYPE IF EXISTS invoice_status;
-- DROP TYPE IF EXISTS transport_type;
