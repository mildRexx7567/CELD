using CELD.Application.Equipment;
using CELD.Application.Lending;
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

    public async Task<EquipmentDetail?>
        GetAsync(
            Guid equipmentId,
            CancellationToken cancellationToken = default)
    {
        return await _db.EquipmentItems
            .Where(
                x => x.Id == equipmentId)
            .Select(
                x => new EquipmentDetail(
                    x.Id,
                    x.AssetTag,
                    x.Name,
                    x.CategoryId))
            .FirstOrDefaultAsync(
                cancellationToken);
    }

    public async Task<IReadOnlyList<EquipmentAvailabilityView>>
        ListAvailabilityAsync(
            CancellationToken cancellationToken = default)
    {
        var checkedOutEquipment =
            await _db.LendingTransactions
                .Where(
                    x => x.ReturnedUtc == null)
                .Select(
                    x => x.EquipmentItemId)
                .ToListAsync(cancellationToken);

        return await _db.EquipmentItems
            .Select(
                x => new EquipmentAvailabilityView(
                    x.Id,
                    x.AssetTag,
                    x.Name,
                    !checkedOutEquipment.Contains(
                        x.Id)))
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<EquipmentAvailabilityView>>
        ListAvailabilityAsync(
            EquipmentAvailabilityRangeFilter filter,
            CancellationToken cancellationToken = default)
    {
        var reservedEquipment =
            await _db.Reservations
                .Where(
                    x =>
                        filter.ReservedFromUtc <
                        x.ReservedUntilUtc &&
                        filter.ReservedUntilUtc >
                        x.ReservedFromUtc)
                .Select(
                    x => x.EquipmentItemId)
                .Distinct()
                .ToListAsync(cancellationToken);

        return await _db.EquipmentItems
            .Select(
                x => new EquipmentAvailabilityView(
                    x.Id,
                    x.AssetTag,
                    x.Name,
                    !reservedEquipment.Contains(
                        x.Id)))
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<EquipmentLendingHistoryItem>>
        GetLendingHistoryAsync(
            Guid equipmentItemId,
            CancellationToken cancellationToken = default)
    {
        return await _db.LendingTransactions
            .Where(
                x => x.EquipmentItemId ==
                     equipmentItemId)
            .OrderByDescending(
                x => x.CheckedOutUtc)
            .Select(
                x => new EquipmentLendingHistoryItem(
                    x.Id,
                    x.StudentNumber,
                    x.CheckedOutUtc,
                    x.ReturnedUtc))
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<EquipmentReservationHistoryItem>>
    GetReservationHistoryAsync(
        Guid equipmentItemId,
        CancellationToken cancellationToken = default)
{
    return await _db.Reservations
        .Where(
            x => x.EquipmentItemId ==
                 equipmentItemId)
        .OrderByDescending(
            x => x.ReservedFromUtc)
        .Select(
            x => new EquipmentReservationHistoryItem(
                x.Id,
                x.StudentNumber,
                x.ReservedFromUtc,
                x.ReservedUntilUtc))
        .ToListAsync(cancellationToken);
}

public async Task<EquipmentDetail>
    CreateAsync(
        CreateEquipmentCommand command,
        CancellationToken cancellationToken = default)
{
    var equipment = new EquipmentItem(
        Guid.NewGuid(),
        command.AssetTag,
        command.Name,
        command.CategoryId);

    _db.EquipmentItems.Add(
        equipment);

    await _db.SaveChangesAsync(
        cancellationToken);

    return new EquipmentDetail(
        equipment.Id,
        equipment.AssetTag,
        equipment.Name,
        equipment.CategoryId);
}

public async Task<EquipmentDetail?>
    UpdateAsync(
        UpdateEquipmentCommand command,
        CancellationToken cancellationToken = default)
{
    var equipment =
        await _db.EquipmentItems
            .FirstOrDefaultAsync(
                x => x.Id == command.EquipmentId,
                cancellationToken);

    if (equipment is null)
    {
        return null;
    }

    typeof(EquipmentItem)
        .GetProperty(nameof(EquipmentItem.AssetTag))!
        .SetValue(equipment, command.AssetTag);

    typeof(EquipmentItem)
        .GetProperty(nameof(EquipmentItem.Name))!
        .SetValue(equipment, command.Name);

    typeof(EquipmentItem)
        .GetProperty(nameof(EquipmentItem.CategoryId))!
        .SetValue(equipment, command.CategoryId);

    await _db.SaveChangesAsync(
        cancellationToken);

    return new EquipmentDetail(
        equipment.Id,
        equipment.AssetTag,
        equipment.Name,
        equipment.CategoryId);
}

public async Task<bool>
    DeleteAsync(
        Guid equipmentId,
        CancellationToken cancellationToken = default)
{
    var equipment =
        await _db.EquipmentItems
            .FirstOrDefaultAsync(
                x => x.Id == equipmentId,
                cancellationToken);

    if (equipment is null)
    {
        return false;
    }

    var hasReservations =
        await _db.Reservations.AnyAsync(
            x => x.EquipmentItemId == equipmentId,
            cancellationToken);

    var hasOpenLoans =
        await _db.LendingTransactions.AnyAsync(
            x => x.EquipmentItemId == equipmentId &&
                 x.ReturnedUtc == null,
            cancellationToken);

    if (hasReservations || hasOpenLoans)
    {
        throw new InvalidOperationException(
            "Equipment cannot be deleted while reserved or checked out.");
    }

    _db.EquipmentItems.Remove(
        equipment);

    await _db.SaveChangesAsync(
        cancellationToken);

    return true;
}

}