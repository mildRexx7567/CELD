import { useEffect, useState } from "react";
import { celdApi } from "../api/celdApi";

type Equipment = {
    id: string;
    assetTag: string;
    name: string;
    categoryId: string;
};

export default function EquipmentPage() {
    const [equipment, setEquipment] =
        useState<Equipment[]>([]);

    const [assetTag, setAssetTag] =
        useState("");

    const [name, setName] =
        useState("");

    const [categoryId, setCategoryId] =
        useState("");

    const loadEquipment = () => {
        celdApi
            .get("/equipment")
            .then(response =>
                setEquipment(response.data));
    };

    useEffect(() => {
        loadEquipment();
    }, []);

    const createEquipment = async () => {
        try {
            await celdApi.post(
                "/equipment",
                {
                    assetTag,
                    name,
                    categoryId
                });

            setAssetTag("");
            setName("");
            setCategoryId("");

            loadEquipment();
        }
        catch {
            alert(
                "Unable to create equipment."
            );
        }
    };

    const deleteEquipment = async (
        id: string
    ) => {
        try {
            await celdApi.delete(
                `/equipment/${id}`);

            loadEquipment();
        }
        catch {
            alert(
                "Equipment cannot be deleted because it has reservations or lending history."
            );
        }
    };

    return (
        <div className="container mt-4">
            <h1>Equipment Catalog</h1>

            <div className="card shadow p-3 mb-4">
                <h3 className="mb-3">
                    Create Equipment
                </h3>

                <input
                    className="form-control mb-2"
                    placeholder="Asset Tag"
                    value={assetTag}
                    onChange={e =>
                        setAssetTag(
                            e.target.value
                        )
                    }
                />

                <input
                    className="form-control mb-2"
                    placeholder="Equipment Name"
                    value={name}
                    onChange={e =>
                        setName(
                            e.target.value
                        )
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="Category Id"
                    value={categoryId}
                    onChange={e =>
                        setCategoryId(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-success"
                    onClick={createEquipment}
                >
                    Create Equipment
                </button>
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <h3>Equipment Inventory</h3>

                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Asset Tag</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {equipment.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <strong>
                                            {item.assetTag}
                                        </strong>
                                    </td>

                                    <td>
                                        {item.name}
                                    </td>

                                    <td>
                                        {item.categoryId ===
                                        "11111111-1111-1111-1111-111111111111" ? (
                                            <span className="badge bg-primary">
                                                Laptop
                                            </span>
                                        ) : (
                                            <span className="badge bg-success">
                                                Camera
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        "Delete this equipment?"
                                                    )
                                                ) {
                                                    deleteEquipment(
                                                        item.id
                                                    );
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}