namespace CELD.Api.Contracts.Reservations;

public sealed record ReservationResponse(
    Guid Id,
    Guid EquipmentItemId,
    string StudentNumber,
    DateTime ReservedFromUtc,
    DateTime ReservedUntilUtc);