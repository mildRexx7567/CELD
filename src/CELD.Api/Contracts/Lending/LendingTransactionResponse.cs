namespace CELD.Api.Contracts.Lending;

public sealed record LendingTransactionResponse(
    Guid Id,
    Guid EquipmentItemId,
    string StudentNumber,
    DateTime CheckedOutUtc,
    DateTime? ReturnedUtc);
