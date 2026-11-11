namespace CELD.Application.Equipment;

public sealed class EquipmentItem
{
    private EquipmentItem()
    {
    }

    public EquipmentItem(
        Guid id,
        string assetTag,
        string name,
        Guid categoryId)
    {
        Id = id;
        AssetTag = assetTag;
        Name = name;
        CategoryId = categoryId;
    }

    public Guid Id { get; private set; }

    public string AssetTag { get; private set; } = string.Empty;

    public string Name { get; private set; } = string.Empty;

    public Guid CategoryId { get; private set; }
}