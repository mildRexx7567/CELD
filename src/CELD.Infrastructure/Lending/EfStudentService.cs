using CELD.Application.Lending;
using CELD.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CELD.Infrastructure.Lending;

public sealed class EfStudentService
    : IStudentService
{
    private readonly CELDDbContext _db;

    public EfStudentService(
        CELDDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<StudentView>>
        ListAsync(
            CancellationToken cancellationToken = default)
    {
        return await _db.Students
            .Select(x =>
                new StudentView(
                    x.StudentNumber,
                    x.FirstName,
                    x.LastName,
                    x.Email))
            .ToListAsync(cancellationToken);
    }

    public async Task<StudentView>
        CreateAsync(
            CreateStudentCommand command,
            CancellationToken cancellationToken = default)
    {
        var student = new Student(
            command.StudentNumber,
            command.FirstName,
            command.LastName,
            command.Email);

        _db.Students.Add(student);

        await _db.SaveChangesAsync(
            cancellationToken);

        return new StudentView(
            student.StudentNumber,
            student.FirstName,
            student.LastName,
            student.Email);
    }
}