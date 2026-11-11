namespace CELD.Application.Lending;

public sealed class LendingTransaction
{
    private LendingTransaction()
    {
    }

    public LendingTransaction(
        Guid id,
        Guid equipmentItemId,
        string studentNumber,
        DateTime checkedOutUtc)
    {
        Id = id;
        EquipmentItemId = equipmentItemId;
        StudentNumber = studentNumber;
        CheckedOutUtc = checkedOutUtc;
    }

    public Guid Id { get; private set; }

    public Guid EquipmentItemId { get; private set; }

    public string StudentNumber { get; private set; } = string.Empty;

    public DateTime CheckedOutUtc { get; private set; }

    public DateTime? ReturnedUtc { get; private set; }

    public void ReturnItem(
        DateTime returnedUtc)
    {
        ReturnedUtc = returnedUtc;
    }
}