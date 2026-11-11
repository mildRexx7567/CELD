namespace CELD.Application.Equipment;

public sealed record EquipmentView(
    Guid Id,
    string AssetTag,
    string Name,
    Guid CategoryId);