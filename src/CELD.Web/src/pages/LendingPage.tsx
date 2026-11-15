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
        try {
            await celdApi.post(
                "/lending/checkout",
                {
                    equipmentItemId,
                    studentNumber
                });

            setEquipmentItemId("");
            setStudentNumber("");

            loadTransactions();
        }
        catch {
            alert(
                "Unable to checkout equipment."
            );
        }
    };

    const returnEquipment = async (
        id: string
    ) => {
        if (
            !window.confirm(
                "Return this equipment?"
            )
        ) {
            return;
        }

        await celdApi.post(
            `/lending/${id}/return`
        );

        loadTransactions();
    };

    return (
        <div className="container mt-4">
            <h1>Lending Management</h1>

            <div className="card shadow p-3 mb-4">
                <h3>Checkout Equipment</h3>

                <input
                    className="form-control mb-2"
                    placeholder="Equipment Id"
                    value={equipmentItemId}
                    onChange={e =>
                        setEquipmentItemId(
                            e.target.value
                        )
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="Student Number"
                    value={studentNumber}
                    onChange={e =>
                        setStudentNumber(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-success"
                    onClick={checkoutEquipment}
                >
                    Checkout Equipment
                </button>
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <h3>Lending Transactions</h3>

                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Equipment</th>
                                <th>Checked Out</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map(t => (
                                <tr key={t.id}>
                                    <td>
                                        <span className="badge bg-primary">
                                            {t.studentNumber}
                                        </span>
                                    </td>

                                    <td>
                                        {t.equipmentItemId}
                                    </td>

                                    <td>
                                        {new Date(
                                            t.checkedOutUtc
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        {t.returnedUtc ? (
                                            <span className="badge bg-success">
                                                Returned
                                            </span>
                                        ) : (
                                            <span className="badge bg-warning text-dark">
                                                Active
                                            </span>
                                        )}
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
            </div>
        </div>
    );
}