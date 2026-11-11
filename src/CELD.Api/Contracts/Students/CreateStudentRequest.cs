namespace CELD.Api.Contracts.Students;

public sealed record CreateStudentRequest(
    string StudentNumber,
    string FirstName,
    string LastName,
    string Email);