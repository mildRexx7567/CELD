namespace CELD.Api.Contracts.Equipment;

public sealed record CreateEquipmentRequest(
    string AssetTag,
    string Name,
    Guid CategoryId);
    