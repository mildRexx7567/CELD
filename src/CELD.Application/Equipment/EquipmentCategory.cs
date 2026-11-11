namespace CELD.Application.Equipment;

public sealed class EquipmentCategory
{
    private EquipmentCategory()
    {
    }

    public EquipmentCategory(
        Guid id,
        string name)
    {
        Id = id;
        Name = name;
    }

    public Guid Id { get; private set; }

    public string Name { get; private set; } = string.Empty;
}