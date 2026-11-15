import { useEffect, useState } from "react";
import { celdApi } from "../api/celdApi";

type LendingTransaction = {
    id: string;
    equipmentItemId: string;
    studentNumber: string;
    checkedOutUtc: string;
    returnedUtc: string | null;
};

type Equipment = {
    id: string;
    assetTag: string;
    name: string;
};

type Student = {
    studentNumber: string;
    firstName: string;
    lastName: string;
};

export default function LendingPage() {
    const [transactions, setTransactions] =
        useState<LendingTransaction[]>([]);

    const [equipmentList, setEquipmentList] =
        useState<Equipment[]>([]);

    const [students, setStudents] =
        useState<Student[]>([]);

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

        celdApi
            .get("/equipment")
            .then(response =>
                setEquipmentList(
                    response.data
                ));

        celdApi
            .get("/students")
            .then(response =>
                setStudents(
                    response.data
                ));
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

    const equipmentName = (
        equipmentId: string
    ) => {
        const equipment =
            equipmentList.find(
                e => e.id === equipmentId
            );

        return equipment
            ? `${equipment.assetTag} - ${equipment.name}`
            : equipmentId;
    };

    return (
        <div className="container mt-4">
            <h1>Lending Management</h1>

            <div className="card shadow p-3 mb-4">
                <h3>Checkout Equipment</h3>

                <select
                    className="form-select mb-2"
                    value={equipmentItemId}
                    onChange={e =>
                        setEquipmentItemId(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        Select Equipment
                    </option>

                    {equipmentList.map(
                        equipment => (
                            <option
                                key={equipment.id}
                                value={equipment.id}
                            >
                                {equipment.assetTag}
                                {" - "}
                                {equipment.name}
                            </option>
                        )
                    )}
                </select>

                <select
                    className="form-select mb-3"
                    value={studentNumber}
                    onChange={e =>
                        setStudentNumber(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        Select Student
                    </option>

                    {students.map(
                        student => (
                            <option
                                key={
                                    student.studentNumber
                                }
                                value={
                                    student.studentNumber
                                }
                            >
                                {student.studentNumber}
                                {" - "}
                                {student.firstName}
                                {" "}
                                {student.lastName}
                            </option>
                        )
                    )}
                </select>

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
                                        {equipmentName(
                                            t.equipmentItemId
                                        )}
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