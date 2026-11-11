namespace CELD.Application.Lending;

public sealed record StudentView(
    string StudentNumber,
    string FirstName,
    string LastName,
    string Email);