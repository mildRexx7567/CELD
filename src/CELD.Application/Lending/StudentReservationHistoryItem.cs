namespace CELD.Application.Lending;

public sealed record StudentReservationHistoryItem(
    Guid ReservationId,
    Guid EquipmentItemId,
    DateTime ReservedFromUtc,
    DateTime ReservedUntilUtc);
