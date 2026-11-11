namespace CELD.Api.Contracts.Equipment;

public sealed record UpdateEquipmentRequest(
    string AssetTag,
    string Name,
    Guid CategoryId);