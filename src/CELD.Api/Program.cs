using CELD.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using CELD.Application.Equipment;
using CELD.Infrastructure.Equipment;
using CELD.Application.Lending;
using CELD.Infrastructure.Lending;
using CELD.Api.Contracts.Students;
using CELD.Api.Contracts.Reservations;
using CELD.Api.Contracts.Lending;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("CELD");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "Connection string 'CELD' is not configured.");
}

builder.Services.AddDbContext<CELDDbContext>(
    options =>
        options.UseSqlServer(connectionString));

builder.Services.AddScoped<
    IEquipmentService,
    EfEquipmentService>();

builder.Services.AddScoped<
    IStudentService,
    EfStudentService>();

builder.Services.AddScoped<
    IReservationService,
    EfReservationService>();

builder.Services.AddScoped<
    ILendingService,
    EfLendingService>();

var app = builder.Build();

app.MapGet(
    "/api/status",
    async (
        CELDDbContext db,
        CancellationToken cancellationToken) =>
    {
        await db.Database
            .ExecuteSqlRawAsync(
                "SELECT 1",
                cancellationToken);

        return Results.Ok(new
        {
            Api = "OK",
            Database = "OK"
        });
    });

app.MapGet(
    "/api/equipment",
    async (
        IEquipmentService equipmentService,
        CancellationToken cancellationToken) =>
    {
        var equipment =
            await equipmentService.ListAsync(
                new EquipmentSearchFilter(
                    null,
                    null,
                    null),
                cancellationToken);

        return Results.Ok(equipment);
    });

app.MapGet(
    "/api/students",
    async (
        IStudentService studentService,
        CancellationToken cancellationToken) =>
    {
        var students =
            await studentService.ListAsync(
                cancellationToken);

        return Results.Ok(
            students.Select(
                x => new StudentResponse(
                    x.StudentNumber,
                    x.FirstName,
                    x.LastName,
                    x.Email)));
    });

app.MapPost(
    "/api/students",
    async (
        CreateStudentRequest request,
        IStudentService studentService,
        CancellationToken cancellationToken) =>
    {
        var student =
            await studentService.CreateAsync(
                new CreateStudentCommand(
                    request.StudentNumber,
                    request.FirstName,
                    request.LastName,
                    request.Email),
                cancellationToken);

        return Results.Ok(
            new StudentResponse(
                student.StudentNumber,
                student.FirstName,
                student.LastName,
                student.Email));
    });

app.MapGet(
    "/api/reservations",
    async (
        IReservationService reservationService,
        CancellationToken cancellationToken) =>
    {
        var reservations =
            await reservationService.ListAsync(
                cancellationToken);

        return Results.Ok(
            reservations.Select(
                x => new ReservationResponse(
                    x.Id,
                    x.EquipmentItemId,
                    x.StudentNumber,
                    x.ReservedFromUtc,
                    x.ReservedUntilUtc)));
    });

app.MapPost(
    "/api/reservations",
    async (
        CreateReservationRequest request,
        IReservationService reservationService,
        CancellationToken cancellationToken) =>
    {
        var reservation =
            await reservationService.CreateAsync(
                new CreateReservationCommand(
                    request.EquipmentItemId,
                    request.StudentNumber,
                    request.ReservedFromUtc,
                    request.ReservedUntilUtc),
                cancellationToken);

        return Results.Ok(
            new ReservationResponse(
                reservation.Id,
                reservation.EquipmentItemId,
                reservation.StudentNumber,
                reservation.ReservedFromUtc,
                reservation.ReservedUntilUtc));
    });

app.MapGet(
    "/api/lending",
    async (
        ILendingService lendingService,
        CancellationToken cancellationToken) =>
    {
        var transactions =
            await lendingService.ListAsync(
                cancellationToken);

        return Results.Ok(
            transactions.Select(
                x => new LendingTransactionResponse(
                    x.Id,
                    x.EquipmentItemId,
                    x.StudentNumber,
                    x.CheckedOutUtc,
                    x.ReturnedUtc)));
    });

app.MapPost(
    "/api/lending/checkout",
    async (
        CheckoutEquipmentRequest request,
        ILendingService lendingService,
        CancellationToken cancellationToken) =>
    {
        var transaction =
            await lendingService.CheckoutAsync(
                new CheckoutEquipmentCommand(
                    request.EquipmentItemId,
                    request.StudentNumber),
                cancellationToken);

        return Results.Ok(
            new LendingTransactionResponse(
                transaction.Id,
                transaction.EquipmentItemId,
                transaction.StudentNumber,
                transaction.CheckedOutUtc,
                transaction.ReturnedUtc));
    });

app.MapPost(
    "/api/lending/{id:guid}/return",
    async (
        Guid id,
        ILendingService lendingService,
        CancellationToken cancellationToken) =>
    {
        var transaction =
            await lendingService.ReturnAsync(
                new ReturnEquipmentCommand(
                    id),
                cancellationToken);

        if (transaction is null)
        {
            return Results.NotFound();
        }

        return Results.Ok(
            new LendingTransactionResponse(
                transaction.Id,
                transaction.EquipmentItemId,
                transaction.StudentNumber,
                transaction.CheckedOutUtc,
                transaction.ReturnedUtc));
    });

app.MapGet(
    "/api/equipment/availability",
    async (
        IEquipmentService equipmentService,
        CancellationToken cancellationToken) =>
    {
        var availability =
            await equipmentService
                .ListAvailabilityAsync(
                    cancellationToken);

        return Results.Ok(availability);
    });
    
app.Run();

public partial class Program
{
}