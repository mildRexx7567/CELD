namespace CELD.Application.Equipment;

public sealed record UpdateEquipmentCommand(
    Guid EquipmentId,
    string AssetTag,
    string Name,
    Guid CategoryId);