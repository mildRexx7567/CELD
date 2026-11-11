namespace CELD.Application.Lending;

public sealed record LendingTransactionView(
    Guid Id,
    Guid EquipmentItemId,
    string StudentNumber,
    DateTime CheckedOutUtc,
    DateTime? ReturnedUtc);