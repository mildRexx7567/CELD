namespace CELD.Application.Equipment;

public interface IEquipmentService
{
    Task<IReadOnlyList<EquipmentView>>
        ListAsync(
            EquipmentSearchFilter filter,
            CancellationToken cancellationToken = default);

    Task<IReadOnlyList<EquipmentAvailabilityView>>
    ListAvailabilityAsync(
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<EquipmentAvailabilityView>>
    ListAvailabilityAsync(
        EquipmentAvailabilityRangeFilter filter,
        CancellationToken cancellationToken = default);

    Task<EquipmentDetail?>
    GetAsync(
        Guid equipmentId,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<EquipmentLendingHistoryItem>>
    GetLendingHistoryAsync(
        Guid equipmentItemId,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<EquipmentReservationHistoryItem>>
    GetReservationHistoryAsync(
        Guid equipmentItemId,
        CancellationToken cancellationToken = default); 

    Task<EquipmentDetail>
    CreateAsync(
        CreateEquipmentCommand command,
        CancellationToken cancellationToken = default);

Task<EquipmentDetail?>
    UpdateAsync(
        UpdateEquipmentCommand command,
        CancellationToken cancellationToken = default);
}