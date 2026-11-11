namespace CELD.Application.Lending;

public sealed record ReservationLookupFilter(
    Guid? EquipmentItemId,
    string? StudentNumber);
