namespace CELD.Application.Lending;

public sealed record CancelReservationCommand(
    Guid ReservationId);