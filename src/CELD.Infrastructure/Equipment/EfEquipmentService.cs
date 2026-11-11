using CELD.Application.Equipment;
using CELD.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CELD.Infrastructure.Equipment;

public sealed class EfEquipmentService
    : IEquipmentService
{
    private readonly CELDDbContext _db;

    public EfEquipmentService(
        CELDDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<EquipmentView>>
        ListAsync(
            EquipmentSearchFilter filter,
            CancellationToken cancellationToken = default)
    {
        var query =
            _db.EquipmentItems
                .AsQueryable();

        if (!string.IsNullOrWhiteSpace(
            filter.AssetTag))
        {
            query =
                query.Where(
                    x => x.AssetTag.Contains(
                        filter.AssetTag));
        }

        if (!string.IsNullOrWhiteSpace(
            filter.Name))
        {
            query =
                query.Where(
                    x => x.Name.Contains(
                        filter.Name));
        }

        if (filter.CategoryId.HasValue)
        {
            query =
                query.Where(
                    x => x.CategoryId ==
                         filter.CategoryId.Value);
        }

        return await query
            .Select(
                x => new EquipmentView(
                    x.Id,
                    x.AssetTag,
                    x.Name,
                    x.CategoryId))
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<EquipmentAvailabilityView>>
    ListAvailabilityAsync(
        CancellationToken cancellationToken = default)
{
    var checkedOutEquipment =
        await _db.LendingTransactions
            .Where(x => x.ReturnedUtc == null)
            .Select(x => x.EquipmentItemId)
            .ToListAsync(cancellationToken);

    return await _db.EquipmentItems
        .Select(x =>
            new EquipmentAvailabilityView(
                x.Id,
                x.AssetTag,
                x.Name,
                !checkedOutEquipment.Contains(x.Id)))
        .ToListAsync(cancellationToken);
}

}