namespace CELD.Api.Contracts.Reservations;

public sealed record CreateReservationRequest(
    Guid EquipmentItemId,
    string StudentNumber,
    DateTime ReservedFromUtc,
    DateTime ReservedUntilUtc);