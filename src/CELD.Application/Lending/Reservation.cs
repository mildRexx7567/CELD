namespace CELD.Application.Lending;

public sealed class Reservation
{
    private Reservation()
    {
    }

    public Reservation(
        Guid id,
        Guid equipmentItemId,
        string studentNumber,
        DateTime reservedFromUtc,
        DateTime reservedUntilUtc)
    {
        Id = id;
        EquipmentItemId = equipmentItemId;
        StudentNumber = studentNumber;
        ReservedFromUtc = reservedFromUtc;
        ReservedUntilUtc = reservedUntilUtc;
    }

    public Guid Id { get; private set; }

    public Guid EquipmentItemId { get; private set; }

    public string StudentNumber { get; private set; } = string.Empty;

    public DateTime ReservedFromUtc { get; private set; }

    public DateTime ReservedUntilUtc { get; private set; }
}