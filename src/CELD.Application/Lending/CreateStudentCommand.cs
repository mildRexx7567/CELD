namespace CELD.Application.Lending;

public sealed record CreateStudentCommand(
    string StudentNumber,
    string FirstName,
    string LastName,
    string Email);