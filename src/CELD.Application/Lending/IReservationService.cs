namespace CELD.Application.Lending;

public interface IReservationService
{
    Task<IReadOnlyList<ReservationListItem>>
    ListAsync(
        ReservationSearchFilter filter,
        CancellationToken cancellationToken = default);

    Task<ReservationView>
        CreateAsync(
            CreateReservationCommand command,
            CancellationToken cancellationToken = default);

    Task<bool>
      CancelAsync(
           CancelReservationCommand command,
           CancellationToken cancellationToken = default);

    Task<ReservationDetail?>
    GetAsync(
        Guid reservationId,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<StudentReservationHistoryItem>>
    ListForStudentAsync(
        string studentNumber,
        CancellationToken cancellationToken = default);

}