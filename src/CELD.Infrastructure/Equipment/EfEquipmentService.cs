using CELD.Application.Equipment;
using CELD.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CELD.Infrastructure.Equipment;

public sealed class EfEquipmentService
    : IEquipmentService
{
    private readonly CELDDbContext _db;

    public EfEquipmentService(
        CELDDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<EquipmentView>>
        ListAsync(
            CancellationToken cancellationToken = default)
    {
        return await _db.EquipmentItems
            .Select(
                x => new EquipmentView(
                    x.Id,
                    x.AssetTag,
                    x.Name,
                    x.CategoryId))
            .ToListAsync(cancellationToken);
    }
}