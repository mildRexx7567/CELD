namespace CELD.Application.Lending;

public interface IReservationService
{
    Task<IReadOnlyList<ReservationView>>
        ListAsync(
            CancellationToken cancellationToken = default);

    Task<ReservationView>
        CreateAsync(
            CreateReservationCommand command,
            CancellationToken cancellationToken = default);
}