namespace CELD.Api.Contracts.Students;

public sealed record StudentResponse(
    string StudentNumber,
    string FirstName,
    string LastName,
    string Email);