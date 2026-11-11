namespace CELD.Application.Lending;

public sealed record ReservationListItem(
    Guid Id,
    Guid EquipmentItemId,
    string StudentNumber,
    DateTime ReservedFromUtc,
    DateTime ReservedUntilUtc);