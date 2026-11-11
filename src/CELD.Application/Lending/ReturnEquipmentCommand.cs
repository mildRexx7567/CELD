namespace CELD.Application.Lending;

public sealed record ReturnEquipmentCommand(
    Guid LendingTransactionId);
