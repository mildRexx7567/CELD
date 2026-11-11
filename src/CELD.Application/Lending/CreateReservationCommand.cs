namespace CELD.Application.Lending;

public sealed record CreateReservationCommand(
    Guid EquipmentItemId,
    string StudentNumber,
    DateTime ReservedFromUtc,
    DateTime ReservedUntilUtc);