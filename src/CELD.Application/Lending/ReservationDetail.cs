namespace CELD.Application.Lending;

public sealed record ReservationDetail(
    Guid Id,
    Guid EquipmentItemId,
    string StudentNumber,
    DateTime ReservedFromUtc,
    DateTime ReservedUntilUtc);
