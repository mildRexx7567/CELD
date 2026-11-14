import { useEffect, useState } from "react";
import { celdApi } from "../api/celdApi";

type LendingTransaction = {
    id: string;
    equipmentItemId: string;
    studentNumber: string;
    checkedOutUtc: string;
    returnedUtc: string | null;
};

export default function LendingPage() {
    const [transactions, setTransactions] =
        useState<LendingTransaction[]>([]);

    const [equipmentItemId, setEquipmentItemId] =
        useState("");

    const [studentNumber, setStudentNumber] =
        useState("");

    const loadTransactions = () => {
        celdApi
            .get("/lending")
            .then(response =>
                setTransactions(response.data));
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    const checkoutEquipment = async () => {
        await celdApi.post(
            "/lending/checkout",
            {
                equipmentItemId,
                studentNumber
            });

        setEquipmentItemId("");
        setStudentNumber("");

        loadTransactions();
    };

    const returnEquipment = async (
        id: string
    ) => {
        await celdApi.post(
            `/lending/${id}/return`
        );

        loadTransactions();
    };

    return (
        <div className="container mt-4">
            <h1>Lending</h1>

            <div className="card p-3 mb-4">
                <h3>Checkout Equipment</h3>

                <input
                    className="form-control mb-2"
                    placeholder="Equipment Id"
                    value={equipmentItemId}
                    onChange={e =>
                        setEquipmentItemId(
                            e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Student Number"
                    value={studentNumber}
                    onChange={e =>
                        setStudentNumber(
                            e.target.value)}
                />

                <button
                    className="btn btn-success"
                    onClick={checkoutEquipment}>
                    Checkout
                </button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Equipment</th>
                        <th>Checked Out</th>
                        <th>Returned</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(t => (
                        <tr key={t.id}>
                            <td>{t.studentNumber}</td>
                            <td>{t.equipmentItemId}</td>
                            <td>{t.checkedOutUtc}</td>
                            <td>
                                {t.returnedUtc ??
                                    "Active"}
                            </td>
                            <td>
                                {!t.returnedUtc && (
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() =>
                                            returnEquipment(
                                                t.id
                                            )
                                        }
                                    >
                                        Return
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}