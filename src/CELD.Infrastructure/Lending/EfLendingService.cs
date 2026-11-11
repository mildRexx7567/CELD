using CELD.Application.Lending;
using CELD.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CELD.Infrastructure.Lending;

public sealed class EfLendingService
    : ILendingService
{
    private readonly CELDDbContext _db;

    public EfLendingService(
        CELDDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<LendingTransactionView>>
        ListAsync(
            CancellationToken cancellationToken = default)
    {
        return await _db.LendingTransactions
            .Select(
                x => new LendingTransactionView(
                    x.Id,
                    x.EquipmentItemId,
                    x.StudentNumber,
                    x.CheckedOutUtc,
                    x.ReturnedUtc))
            .ToListAsync(cancellationToken);
    }

    public async Task<LendingTransactionView>
        CheckoutAsync(
            CheckoutEquipmentCommand command,
            CancellationToken cancellationToken = default)
    {
        var openTransaction =
            await _db.LendingTransactions
                .AnyAsync(
                    x =>
                        x.EquipmentItemId ==
                        command.EquipmentItemId &&
                        x.ReturnedUtc == null,
                    cancellationToken);

        if (openTransaction)
        {
            throw new InvalidOperationException(
                "Equipment is already checked out.");
        }

        var transaction =
            new LendingTransaction(
                Guid.NewGuid(),
                command.EquipmentItemId,
                command.StudentNumber,
                DateTime.UtcNow);

        _db.LendingTransactions.Add(
            transaction);

        await _db.SaveChangesAsync(
            cancellationToken);

        return new LendingTransactionView(
            transaction.Id,
            transaction.EquipmentItemId,
            transaction.StudentNumber,
            transaction.CheckedOutUtc,
            transaction.ReturnedUtc);
    }

    public async Task<LendingTransactionView?>
        ReturnAsync(
            ReturnEquipmentCommand command,
            CancellationToken cancellationToken = default)
    {
        var transaction =
            await _db.LendingTransactions
                .FirstOrDefaultAsync(
                    x => x.Id ==
                         command.LendingTransactionId,
                    cancellationToken);

        if (transaction is null)
        {
            return null;
        }

        transaction.ReturnItem(
            DateTime.UtcNow);

        await _db.SaveChangesAsync(
            cancellationToken);

        return new LendingTransactionView(
            transaction.Id,
            transaction.EquipmentItemId,
            transaction.StudentNumber,
            transaction.CheckedOutUtc,
            transaction.ReturnedUtc);
    }
}