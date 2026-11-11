namespace CELD.Api.Contracts.Lending;

public sealed record CheckoutEquipmentRequest(
    Guid EquipmentItemId,
    string StudentNumber);