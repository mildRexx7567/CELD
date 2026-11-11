namespace CELD.Application.Equipment;

public sealed record EquipmentAvailabilityView(
    Guid EquipmentItemId,
    string AssetTag,
    string Name,
    bool IsAvailable);
