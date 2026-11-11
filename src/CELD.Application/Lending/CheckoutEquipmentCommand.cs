namespace CELD.Application.Lending;

public sealed record CheckoutEquipmentCommand(
    Guid EquipmentItemId,
    string StudentNumber);