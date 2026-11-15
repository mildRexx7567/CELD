import { useEffect, useState } from "react";
import { celdApi } from "../api/celdApi";

import {
    FaLaptop,
    FaUsers,
    FaCalendarCheck,
    FaExchangeAlt
} from "react-icons/fa";

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
        celdApi
            .get("/equipment")
            .then(r =>
                setEquipmentCount(
                    r.data.length
                )
            );

        celdApi
            .get("/students")
            .then(r =>
                setStudentCount(
                    r.data.length
                )
            );

        celdApi
            .get("/reservations")
            .then(r =>
                setReservationCount(
                    r.data.length
                )
            );

        celdApi
            .get("/lending")
            .then(r =>
                setLendingCount(
                    r.data.length
                )
            );
    }, []);

    return (
        <div className="container mt-4">
            <div className="mb-4">
                <h1>
                    CELD Dashboard
                </h1>

                <p className="text-muted">
                    Campus Equipment Lending Desk
                </p>
            </div>

            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card text-bg-primary shadow-lg">
                        <div className="card-body text-center">
                            <FaLaptop size={40} />

                            <h5 className="mt-3">
                                Equipment
                            </h5>

                            <h2>
                                {equipmentCount}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card text-bg-success shadow-lg">
                        <div className="card-body text-center">
                            <FaUsers size={40} />

                            <h5 className="mt-3">
                                Students
                            </h5>

                            <h2>
                                {studentCount}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card text-bg-warning shadow-lg">
                        <div className="card-body text-center">
                            <FaCalendarCheck size={40} />

                            <h5 className="mt-3">
                                Reservations
                            </h5>

                            <h2>
                                {reservationCount}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card text-bg-danger shadow-lg">
                        <div className="card-body text-center">
                            <FaExchangeAlt size={40} />

                            <h5 className="mt-3">
                                Lending
                            </h5>

                            <h2>
                                {lendingCount}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-lg">
                <div className="card-body">
                    <h3>
                        System Overview
                    </h3>

                    <p>
                        CELD manages equipment inventory,
                        student records, reservations,
                        lending transactions, equipment
                        returns and activity tracking from
                        a centralized web application.
                    </p>

                    <ul>
                        <li>
                            Equipment Management
                        </li>

                        <li>
                            Student Management
                        </li>

                        <li>
                            Reservation Tracking
                        </li>

                        <li>
                            Lending & Returns
                        </li>

                        <li>
                            Activity History
                        </li>
                    </ul>
                </div>
            </div>

            <footer className="mt-5 text-center text-muted">
                <hr />

                <p>
                    Campus Equipment Lending Desk
                    (CELD)
                </p>

                <p>
                    React + ASP.NET Core + EF Core +
                    SQL Server
                </p>
            </footer>
        </div>
    );
}