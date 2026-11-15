import { useEffect, useState } from "react";
import { celdApi } from "../api/celdApi";

type Reservation = {
    id: string;
    equipmentItemId: string;
    studentNumber: string;
    reservedFromUtc: string;
    reservedUntilUtc: string;
};

export default function ReservationsPage() {
    const [reservations, setReservations] =
        useState<Reservation[]>([]);

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

    return (
        <div className="container mt-4">
            <h1>Reservations</h1>

            <div className="card shadow p-3 mb-4">
                <h3>Create Reservation</h3>

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
                    className="form-control mb-2"
                    placeholder="Student Number"
                    value={studentNumber}
                    onChange={e =>
                        setStudentNumber(
                            e.target.value
                        )
                    }
                />

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
                                        {r.equipmentItemId}
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