namespace CELD.Application.Equipment;

public sealed record CreateEquipmentCommand(
    string AssetTag,
    string Name,
    Guid CategoryId);