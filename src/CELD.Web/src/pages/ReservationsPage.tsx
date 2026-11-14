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

            <div className="card p-3 mb-4">
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
                    className="form-control mb-2"
                    value={reservedUntilUtc}
                    onChange={e =>
                        setReservedUntilUtc(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-primary"
                    onClick={createReservation}
                >
                    Create Reservation
                </button>
            </div>

            <table className="table table-striped">
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
                                {r.studentNumber}
                            </td>

                            <td>
                                {r.equipmentItemId}
                            </td>

                            <td>
                                {r.reservedFromUtc}
                            </td>

                            <td>
                                {r.reservedUntilUtc}
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
    );
}