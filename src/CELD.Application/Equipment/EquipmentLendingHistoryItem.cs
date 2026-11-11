namespace CELD.Application.Equipment;

public sealed record EquipmentLendingHistoryItem(
    Guid LendingTransactionId,
    string StudentNumber,
    DateTime CheckedOutUtc,
    DateTime? ReturnedUtc);