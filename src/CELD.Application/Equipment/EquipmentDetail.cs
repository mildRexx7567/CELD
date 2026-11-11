namespace CELD.Application.Equipment;

public sealed record EquipmentDetail(
    Guid Id,
    string AssetTag,
    string Name,
    Guid CategoryId);
