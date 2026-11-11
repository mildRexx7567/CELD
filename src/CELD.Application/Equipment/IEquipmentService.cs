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
}