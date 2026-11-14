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
    };

    return (
        <div className="container mt-4">
            <h1>Equipment Catalog</h1>

            <div className="card p-3 mb-4">
                <h3>Create Equipment</h3>

                <input
                    className="form-control mb-2"
                    placeholder="Asset Tag"
                    value={assetTag}
                    onChange={e =>
                        setAssetTag(
                            e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Equipment Name"
                    value={name}
                    onChange={e =>
                        setName(
                            e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Category Id"
                    value={categoryId}
                    onChange={e =>
                        setCategoryId(
                            e.target.value)}
                />

                <button
                    className="btn btn-primary"
                    onClick={createEquipment}>
                    Create Equipment
                </button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Asset Tag</th>
                        <th>Name</th>
                        <th>Category</th>
                    </tr>
                </thead>

                <tbody>
                    {equipment.map(item => (
                        <tr key={item.id}>
                            <td>{item.assetTag}</td>
                            <td>{item.name}</td>
                            <td>{item.categoryId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}