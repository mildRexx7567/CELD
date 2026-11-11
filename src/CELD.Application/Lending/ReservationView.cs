namespace CELD.Application.Lending;

public sealed record ReservationView(
    Guid Id,
    Guid EquipmentItemId,
    string StudentNumber,
    DateTime ReservedFromUtc,
    DateTime ReservedUntilUtc);