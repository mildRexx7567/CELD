using CELD.Application.Equipment;
using CELD.Application.Lending;
using Microsoft.EntityFrameworkCore;

namespace CELD.Infrastructure.Persistence;

public sealed class CELDDbContext : DbContext
{
    public CELDDbContext(
        DbContextOptions<CELDDbContext> options)
        : base(options)
    {
    }

    public DbSet<EquipmentCategory>
        EquipmentCategories => Set<EquipmentCategory>();

    public DbSet<EquipmentItem>
        EquipmentItems => Set<EquipmentItem>();

    public DbSet<Student>
        Students => Set<Student>();

    public DbSet<Reservation>
        Reservations => Set<Reservation>();

    public DbSet<LendingTransaction>
        LendingTransactions => Set<LendingTransaction>();

    protected override void OnModelCreating(
        ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EquipmentCategory>(
            builder =>
            {
                builder.HasKey(x => x.Id);

                builder.Property(x => x.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                builder.HasData(
                    new EquipmentCategory(
                        Guid.Parse("11111111-1111-1111-1111-111111111111"),
                        "Laptop"),

                    new EquipmentCategory(
                        Guid.Parse("22222222-2222-2222-2222-222222222222"),
                        "Camera"));
            });

        modelBuilder.Entity<EquipmentItem>(
            builder =>
            {
                builder.HasKey(x => x.Id);

                builder.Property(x => x.AssetTag)
                    .IsRequired()
                    .HasMaxLength(50);

                builder.Property(x => x.Name)
                    .IsRequired()
                    .HasMaxLength(200);

                builder.HasIndex(
                    x => x.AssetTag)
                    .IsUnique();

                builder.HasData(
                    new EquipmentItem(
                        Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                        "LT-001",
                        "Dell Latitude 7450",
                        Guid.Parse("11111111-1111-1111-1111-111111111111")),

                    new EquipmentItem(
                        Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                        "CAM-001",
                        "Canon EOS R50",
                        Guid.Parse("22222222-2222-2222-2222-222222222222")));
            });

        modelBuilder.Entity<Student>(
            builder =>
            {
                builder.HasKey(
                    x => x.StudentNumber);

                builder.Property(x => x.FirstName)
                    .HasMaxLength(100);

                builder.Property(x => x.LastName)
                    .HasMaxLength(100);

                builder.Property(x => x.Email)
                    .HasMaxLength(200);
            });

        modelBuilder.Entity<Reservation>(
            builder =>
            {
                builder.HasKey(x => x.Id);
            });

        modelBuilder.Entity<LendingTransaction>(
            builder =>
            {
                builder.HasKey(x => x.Id);
            });
    }
}