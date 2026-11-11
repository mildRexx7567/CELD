namespace CELD.Application.Lending;

public sealed record StudentSearchFilter(
    string? StudentNumber,
    string? Name,
    string? Email);