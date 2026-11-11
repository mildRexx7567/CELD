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
}