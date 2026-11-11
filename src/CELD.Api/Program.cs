using CELD.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using CELD.Application.Equipment;
using CELD.Infrastructure.Equipment;
using CELD.Application.Lending;
using CELD.Infrastructure.Lending;
using CELD.Api.Contracts.Students;

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

app.Run();

public partial class Program
{
}