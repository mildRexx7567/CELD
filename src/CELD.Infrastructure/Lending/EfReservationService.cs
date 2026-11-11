using CELD.Application.Lending;
using CELD.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CELD.Infrastructure.Lending;

public sealed class EfReservationService
    : IReservationService
{
    private readonly CELDDbContext _db;

    public EfReservationService(
        CELDDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<ReservationListItem>>
        ListAsync(
            ReservationSearchFilter filter,
            CancellationToken cancellationToken = default)
    {
        var query =
            _db.Reservations
                .AsQueryable();

        if (filter.EquipmentItemId.HasValue)
        {
            query =
                query.Where(
                    x => x.EquipmentItemId ==
                         filter.EquipmentItemId.Value);
        }

        if (!string.IsNullOrWhiteSpace(
            filter.StudentNumber))
        {
            query =
                query.Where(
                    x => x.StudentNumber ==
                         filter.StudentNumber);
        }

        return await query
            .Select(
                x => new ReservationListItem(
                    x.Id,
                    x.EquipmentItemId,
                    x.StudentNumber,
                    x.ReservedFromUtc,
                    x.ReservedUntilUtc))
            .ToListAsync(cancellationToken);
    }

    public async Task<ReservationView>
        CreateAsync(
            CreateReservationCommand command,
            CancellationToken cancellationToken = default)
    {
        var conflict =
            await _db.Reservations.AnyAsync(
                x =>
                    x.EquipmentItemId ==
                    command.EquipmentItemId &&
                    command.ReservedFromUtc <
                    x.ReservedUntilUtc &&
                    command.ReservedUntilUtc >
                    x.ReservedFromUtc,
                cancellationToken);

        if (conflict)
        {
            throw new InvalidOperationException(
                "Equipment is already reserved for the selected period.");
        }

        var reservation =
            new Reservation(
                Guid.NewGuid(),
                command.EquipmentItemId,
                command.StudentNumber,
                command.ReservedFromUtc,
                command.ReservedUntilUtc);

        _db.Reservations.Add(
            reservation);

        await _db.SaveChangesAsync(
            cancellationToken);

        return new ReservationView(
            reservation.Id,
            reservation.EquipmentItemId,
            reservation.StudentNumber,
            reservation.ReservedFromUtc,
            reservation.ReservedUntilUtc);
    }

    public async Task<bool>
    CancelAsync(
        CancelReservationCommand command,
        CancellationToken cancellationToken = default)
{
    var reservation =
        await _db.Reservations
            .FirstOrDefaultAsync(
                x => x.Id ==
                     command.ReservationId,
                cancellationToken);

    if (reservation is null)
    {
        return false;
    }

    _db.Reservations.Remove(
        reservation);

    await _db.SaveChangesAsync(
        cancellationToken);

    return true;
}

public async Task<ReservationDetail?>
    GetAsync(
        Guid reservationId,
        CancellationToken cancellationToken = default)
{
    return await _db.Reservations
        .Where(
            x => x.Id == reservationId)
        .Select(
            x => new ReservationDetail(
                x.Id,
                x.EquipmentItemId,
                x.StudentNumber,
                x.ReservedFromUtc,
                x.ReservedUntilUtc))
        .FirstOrDefaultAsync(
            cancellationToken);
}

public async Task<IReadOnlyList<StudentReservationHistoryItem>>
    ListForStudentAsync(
        string studentNumber,
        CancellationToken cancellationToken = default)
{
    return await _db.Reservations
        .Where(
            x => x.StudentNumber ==
                 studentNumber)
        .OrderByDescending(
            x => x.ReservedFromUtc)
        .Select(
            x => new StudentReservationHistoryItem(
                x.Id,
                x.EquipmentItemId,
                x.ReservedFromUtc,
                x.ReservedUntilUtc))
        .ToListAsync(cancellationToken);
}

}