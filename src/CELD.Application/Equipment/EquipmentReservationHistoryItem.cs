namespace CELD.Application.Equipment;

public sealed record EquipmentReservationHistoryItem(
    Guid ReservationId,
    string StudentNumber,
    DateTime ReservedFromUtc,
    DateTime ReservedUntilUtc);