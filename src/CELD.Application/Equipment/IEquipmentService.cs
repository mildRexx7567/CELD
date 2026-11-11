namespace CELD.Application.Equipment;

public interface IEquipmentService
{
    Task<IReadOnlyList<EquipmentView>>
        ListAsync(
            CancellationToken cancellationToken = default);
}