namespace CELD.Application.Lending;

public interface ILendingService
{
    Task<IReadOnlyList<LendingTransactionView>>
        ListAsync(
            CancellationToken cancellationToken = default);

    Task<LendingTransactionView>
        CheckoutAsync(
            CheckoutEquipmentCommand command,
            CancellationToken cancellationToken = default);

    Task<LendingTransactionView?>
        ReturnAsync(
            ReturnEquipmentCommand command,
            CancellationToken cancellationToken = default);
}