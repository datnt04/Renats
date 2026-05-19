using Microsoft.EntityFrameworkCore;
using Npgsql;
using Renats_BE.Data;
using Renats_BE.Models.Enums;
using Renats_BE.Repositories;
using Renats_BE.Repositories.Interfaces;
using Renats_BE.Services;
using Renats_BE.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// ── Database ──────────────────────────────────────────────────────────────────
var dataSourceBuilder = new NpgsqlDataSourceBuilder(
    builder.Configuration.GetConnectionString("DefaultConnection"));

dataSourceBuilder.MapEnum<UserRole>("user_role");
dataSourceBuilder.MapEnum<MaterialType>("material_type");
dataSourceBuilder.MapEnum<BatchStatus>("batch_status");
dataSourceBuilder.MapEnum<TransportType>("transport_type");
dataSourceBuilder.MapEnum<BidStatus>("bid_status");
dataSourceBuilder.MapEnum<TransportStatus>("transport_status");
dataSourceBuilder.MapEnum<InvoiceStatus>("invoice_status");

var dataSource = dataSourceBuilder.Build();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(dataSource));

// ── Repositories ──────────────────────────────────────────────────────────────
builder.Services.AddScoped<ISellerRepository, SellerRepository>();
builder.Services.AddScoped<IPickupRequestRepository, PickupRequestRepository>();

// ── Services ──────────────────────────────────────────────────────────────────
builder.Services.AddScoped<ISellerService, SellerService>();
builder.Services.AddScoped<IPickupRequestService, PickupRequestService>();

// ── CORS (allow React dev server on any localhost port) ──────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
                new Uri(origin).Host == "localhost" ||
                new Uri(origin).Host == "127.0.0.1"
              )
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Re-Nats API", Version = "v1" });
});

var app = builder.Build();

// ── Seed database ─────────────────────────────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await DbSeeder.SeedAsync(db);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();