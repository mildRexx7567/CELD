namespace CELD.Application.Lending;

public sealed record ReservationSearchFilter(
    Guid? EquipmentItemId,
    string? StudentNumber);
