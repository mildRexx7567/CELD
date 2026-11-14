import { useEffect, useState } from "react";
import { celdApi } from "../api/celdApi";

export default function DashboardPage() {
    const [equipmentCount, setEquipmentCount] =
        useState(0);

    const [studentCount, setStudentCount] =
        useState(0);

    const [reservationCount, setReservationCount] =
        useState(0);

    const [lendingCount, setLendingCount] =
        useState(0);

    useEffect(() => {
        celdApi.get("/equipment")
            .then(r =>
                setEquipmentCount(
                    r.data.length));

        celdApi.get("/students")
            .then(r =>
                setStudentCount(
                    r.data.length));

        celdApi.get("/reservations")
            .then(r =>
                setReservationCount(
                    r.data.length));

        celdApi.get("/lending")
            .then(r =>
                setLendingCount(
                    r.data.length));
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">
                CELD Dashboard
            </h1>

            <div className="row">
                <div className="col-md-3 mb-3">
                    <div className="card text-bg-primary shadow">
                        <div className="card-body">
                            <h5 className="card-title">
                                Equipment
                            </h5>

                            <h2>
                                {equipmentCount}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-bg-success shadow">
                        <div className="card-body">
                            <h5 className="card-title">
                                Students
                            </h5>

                            <h2>
                                {studentCount}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-bg-warning shadow">
                        <div className="card-body">
                            <h5 className="card-title">
                                Reservations
                            </h5>

                            <h2>
                                {reservationCount}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-bg-danger shadow">
                        <div className="card-body">
                            <h5 className="card-title">
                                Lending
                            </h5>

                            <h2>
                                {lendingCount}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-4 shadow">
                <div className="card-body">
                    <h3>
                        Campus Equipment Lending Desk
                    </h3>

                    <p className="mb-0">
                        Manage equipment,
                        students,
                        reservations,
                        checkouts,
                        returns and
                        lending activity
                        from a single dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}