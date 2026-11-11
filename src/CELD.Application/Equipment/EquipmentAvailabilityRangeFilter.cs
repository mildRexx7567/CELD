namespace CELD.Application.Equipment;

public sealed record EquipmentAvailabilityRangeFilter(
    DateTime ReservedFromUtc,
    DateTime ReservedUntilUtc);