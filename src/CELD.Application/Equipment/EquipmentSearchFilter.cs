namespace CELD.Application.Equipment;

public sealed record EquipmentSearchFilter(
    string? AssetTag,
    string? Name,
    Guid? CategoryId);