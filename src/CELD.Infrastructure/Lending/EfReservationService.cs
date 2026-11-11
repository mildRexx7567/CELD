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

    public async Task<IReadOnlyList<ReservationView>>
        ListAsync(
            CancellationToken cancellationToken = default)
    {
        return await _db.Reservations
            .Select(
                x => new ReservationView(
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
}