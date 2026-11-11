namespace CELD.Application.Lending;

public interface IStudentService
{
Task<IReadOnlyList<StudentView>>
    ListAsync(
        StudentSearchFilter filter,
        CancellationToken cancellationToken = default);

    Task<StudentView>
        CreateAsync(
            CreateStudentCommand command,
            CancellationToken cancellationToken = default);
}