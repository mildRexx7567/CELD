import { useEffect, useState } from "react";
import { celdApi } from "../api/celdApi";

type Reservation = {
    id: string;
    equipmentItemId: string;
    studentNumber: string;
    reservedFromUtc: string;
    reservedUntilUtc: string;
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

export default function ReservationsPage() {
    const [reservations, setReservations] =
        useState<Reservation[]>([]);

    const [equipmentList, setEquipmentList] =
        useState<Equipment[]>([]);

    const [students, setStudents] =
        useState<Student[]>([]);

    const [equipmentItemId, setEquipmentItemId] =
        useState("");

    const [studentNumber, setStudentNumber] =
        useState("");

    const [reservedFromUtc, setReservedFromUtc] =
        useState("");

    const [reservedUntilUtc, setReservedUntilUtc] =
        useState("");

    const loadReservations = () => {
        celdApi
            .get("/reservations")
            .then(response =>
                setReservations(response.data));
    };

    useEffect(() => {
        loadReservations();

        celdApi
            .get("/equipment")
            .then(response =>
                setEquipmentList(response.data));

        celdApi
            .get("/students")
            .then(response =>
                setStudents(response.data));
    }, []);

    const createReservation = async () => {
        try {
            await celdApi.post(
                "/reservations",
                {
                    equipmentItemId,
                    studentNumber,
                    reservedFromUtc,
                    reservedUntilUtc
                });

            setEquipmentItemId("");
            setStudentNumber("");
            setReservedFromUtc("");
            setReservedUntilUtc("");

            loadReservations();
        }
        catch {
            alert(
                "Unable to create reservation."
            );
        }
    };

    const cancelReservation = async (
        id: string
    ) => {
        if (
            !window.confirm(
                "Cancel this reservation?"
            )
        ) {
            return;
        }

        await celdApi.delete(
            `/reservations/${id}`);

        loadReservations();
    };

    const equipmentName = (
        equipmentId: string
    ) => {
        const equipment =
            equipmentList.find(
                e =>
                    e.id ===
                    equipmentId
            );

        return equipment
            ? `${equipment.assetTag} - ${equipment.name}`
            : equipmentId;
    };

    return (
        <div className="container mt-4">
            <h1>Reservations</h1>

            <div className="card shadow p-3 mb-4">
                <h3>Create Reservation</h3>

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
                    className="form-select mb-2"
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
                                {
                                    student.studentNumber
                                }
                                {" - "}
                                {
                                    student.firstName
                                }
                                {" "}
                                {
                                    student.lastName
                                }
                            </option>
                        )
                    )}
                </select>

                <input
                    type="datetime-local"
                    className="form-control mb-2"
                    value={reservedFromUtc}
                    onChange={e =>
                        setReservedFromUtc(
                            e.target.value
                        )
                    }
                />

                <input
                    type="datetime-local"
                    className="form-control mb-3"
                    value={reservedUntilUtc}
                    onChange={e =>
                        setReservedUntilUtc(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-success"
                    onClick={createReservation}
                >
                    Create Reservation
                </button>
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <h3>Reservation History</h3>

                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Equipment</th>
                                <th>From</th>
                                <th>Until</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reservations.map(r => (
                                <tr key={r.id}>
                                    <td>
                                        <span className="badge bg-primary">
                                            {r.studentNumber}
                                        </span>
                                    </td>

                                    <td>
                                        {equipmentName(
                                            r.equipmentItemId
                                        )}
                                    </td>

                                    <td>
                                        {new Date(
                                            r.reservedFromUtc
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        {new Date(
                                            r.reservedUntilUtc
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                cancelReservation(
                                                    r.id
                                                )
                                            }
                                        >
                                            Cancel
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