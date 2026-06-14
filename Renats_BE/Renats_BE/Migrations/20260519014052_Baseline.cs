using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Renats_BE.Migrations
{
    /// <inheritdoc />
    public partial class Baseline : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
-- =====================================================
-- EXTENSIONS
-- =====================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================================================
-- ENUM TYPES
-- =====================================================

CREATE TYPE user_role AS ENUM (
    'ADMIN',
    'DEPOT',
    'FACTORY',
    'DRIVER',
    'SELLER'
);

CREATE TYPE batch_status AS ENUM (
    'DRAFT',
    'LISTED',
    'BIDDING',
    'ACCEPTED',
    'READY_FOR_PICKUP',
    'IN_PROGRESS',
    'DELIVERED',
    'VERIFIED',
    'REJECTED',
    'CANCELLED'
);

CREATE TYPE transport_type AS ENUM (
    'SELF_DELIVERY',
    'APP_LOGISTICS'
);

CREATE TYPE transport_status AS ENUM (
    'PENDING',
    'ASSIGNED',
    'PICKED_UP',
    'ON_THE_WAY',
    'DELIVERED',
    'CANCELLED'
);

CREATE TYPE material_type AS ENUM (
    'PET',
    'HDPE',
    'PVC',
    'PAPER',
    'CARDBOARD',
    'ALUMINUM',
    'IRON',
    'STEEL',
    'COPPER',
    'ELECTRONIC_WASTE',
    'OTHER'
);

CREATE TYPE bid_status AS ENUM (
    'PENDING',
    'ACCEPTED',
    'REJECTED'
);

CREATE TYPE invoice_status AS ENUM (
    'PENDING',
    'UPLOADED',
    'VERIFIED',
    'REJECTED'
);

-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,

    role user_role NOT NULL,

    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- DEPOTS
-- =====================================================

CREATE TABLE depots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id),

    company_name VARCHAR(255) NOT NULL,
    tax_code VARCHAR(100),

    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),

    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),

    contact_person VARCHAR(255),
    contact_phone VARCHAR(20),

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- FACTORIES
-- =====================================================

CREATE TABLE factories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id),

    company_name VARCHAR(255) NOT NULL,
    tax_code VARCHAR(100),

    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),

    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),

    contact_person VARCHAR(255),
    contact_phone VARCHAR(20),

    is_premium BOOLEAN DEFAULT FALSE,
    premium_expires_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- DRIVERS
-- =====================================================

CREATE TABLE drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id),

    license_number VARCHAR(100),
    vehicle_plate VARCHAR(50),

    vehicle_type VARCHAR(100),
    max_capacity_kg DECIMAL(12,2),

    is_available BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- INVENTORY BATCHES
-- =====================================================

CREATE TABLE inventory_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    depot_id UUID NOT NULL REFERENCES depots(id),

    batch_code VARCHAR(100) UNIQUE NOT NULL,

    material_type material_type NOT NULL,

    estimated_weight_kg DECIMAL(14,2) NOT NULL,

    actual_weight_kg DECIMAL(14,2),

    moisture_percentage DECIMAL(5,2),
    purity_percentage DECIMAL(5,2),

    unit_price DECIMAL(14,2),

    description TEXT,

    thumbnail_image_url TEXT,

    status batch_status DEFAULT 'DRAFT',

    transport_type transport_type,

    listed_at TIMESTAMP,
    accepted_at TIMESTAMP,
    delivered_at TIMESTAMP,
    verified_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- BATCH IMAGES
-- =====================================================

CREATE TABLE batch_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    batch_id UUID NOT NULL REFERENCES inventory_batches(id) ON DELETE CASCADE,

    image_url TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- BATCH BIDS
-- =====================================================

CREATE TABLE batch_bids (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    batch_id UUID NOT NULL REFERENCES inventory_batches(id),

    factory_id UUID NOT NULL REFERENCES factories(id),

    bid_price DECIMAL(14,2) NOT NULL,

    note TEXT,

    status bid_status DEFAULT 'PENDING',

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- BATCH ORDERS
-- =====================================================

CREATE TABLE batch_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    batch_id UUID NOT NULL REFERENCES inventory_batches(id),

    factory_id UUID NOT NULL REFERENCES factories(id),

    accepted_bid_id UUID REFERENCES batch_bids(id),

    agreed_price DECIMAL(14,2) NOT NULL,

    total_amount DECIMAL(14,2),

    status batch_status NOT NULL,

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- TRANSPORT JOBS
-- =====================================================

CREATE TABLE transport_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    batch_order_id UUID NOT NULL REFERENCES batch_orders(id),

    driver_id UUID REFERENCES drivers(id),

    pickup_address TEXT NOT NULL,
    delivery_address TEXT NOT NULL,

    pickup_latitude DECIMAL(10,7),
    pickup_longitude DECIMAL(10,7),

    delivery_latitude DECIMAL(10,7),
    delivery_longitude DECIMAL(10,7),

    estimated_distance_km DECIMAL(10,2),

    transport_fee DECIMAL(14,2),

    status transport_status DEFAULT 'PENDING',

    pickup_time TIMESTAMP,
    delivered_time TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- TRANSPORT TRACKING LOGS
-- =====================================================

CREATE TABLE transport_tracking_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    transport_job_id UUID NOT NULL REFERENCES transport_jobs(id) ON DELETE CASCADE,

    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),

    note TEXT,

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- WEIGHT TICKETS
-- =====================================================

CREATE TABLE weight_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    batch_order_id UUID NOT NULL REFERENCES batch_orders(id),

    ticket_number VARCHAR(100),

    gross_weight_kg DECIMAL(14,2),
    tare_weight_kg DECIMAL(14,2),
    net_weight_kg DECIMAL(14,2),

    weighing_station VARCHAR(255),

    ticket_image_url TEXT,

    uploaded_by UUID REFERENCES users(id),

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- WEIGHT VERIFICATIONS
-- =====================================================

CREATE TABLE weight_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    batch_order_id UUID NOT NULL REFERENCES batch_orders(id),

    depot_weight_kg DECIMAL(14,2),
    factory_weight_kg DECIMAL(14,2),

    difference_kg DECIMAL(14,2),
    difference_percentage DECIMAL(5,2),

    is_verified BOOLEAN DEFAULT FALSE,

    verification_note TEXT,

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- INVOICES
-- =====================================================

CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    batch_order_id UUID NOT NULL REFERENCES batch_orders(id),

    invoice_number VARCHAR(100),

    invoice_file_url TEXT,

    subtotal DECIMAL(14,2),
    vat_amount DECIMAL(14,2),
    total_amount DECIMAL(14,2),

    status invoice_status DEFAULT 'PENDING',

    uploaded_by UUID REFERENCES users(id),

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- EPR CERTIFICATES
-- =====================================================

CREATE TABLE epr_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    batch_order_id UUID NOT NULL REFERENCES batch_orders(id),

    certificate_code VARCHAR(100) UNIQUE NOT NULL,

    hash_value TEXT NOT NULL,

    material_type material_type NOT NULL,

    certified_weight_kg DECIMAL(14,2),

    issued_at TIMESTAMP DEFAULT NOW(),

    issued_by UUID REFERENCES users(id)
);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id),

    title VARCHAR(255),
    message TEXT,

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- AUDIT LOGS
-- =====================================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID REFERENCES users(id),

    action VARCHAR(255),

    entity_name VARCHAR(255),
    entity_id UUID,

    old_data JSONB,
    new_data JSONB,

    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_batches_status
ON inventory_batches(status);

CREATE INDEX idx_batches_material
ON inventory_batches(material_type);

CREATE INDEX idx_transport_status
ON transport_jobs(status);

CREATE INDEX idx_notifications_user
ON notifications(user_id);

CREATE INDEX idx_audit_entity
ON audit_logs(entity_name, entity_id);
");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
