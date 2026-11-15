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

    const [availableEquipment, setAvailableEquipment] =
        useState(0);

    const [activeLoans, setActiveLoans] =
        useState(0);

    const [recentReservations, setRecentReservations] =
        useState<any[]>([]);

    const [recentLoans, setRecentLoans] =
        useState<any[]>([]);

    useEffect(() => {
        celdApi
            .get("/equipment")
            .then(response => {
                setEquipmentCount(
                    response.data.length
                );
            });

        celdApi
            .get("/students")
            .then(response => {
                setStudentCount(
                    response.data.length
                );
            });

        celdApi
            .get("/reservations")
            .then(response => {
                setReservationCount(
                    response.data.length
                );

                setRecentReservations(
                    response.data.slice(0, 5)
                );
            });

        celdApi
            .get("/lending")
            .then(response => {
                setLendingCount(
                    response.data.length
                );

                setRecentLoans(
                    response.data.slice(0, 5)
                );

                setActiveLoans(
                    response.data.filter(
                        (loan: any) =>
                            loan.returnedUtc === null
                    ).length
                );
            });

        celdApi
            .get("/equipment/availability")
            .then(response => {
                setAvailableEquipment(
                    response.data.filter(
                        (equipment: any) =>
                            equipment.isAvailable
                    ).length
                );
            });
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

                <div className="col-md-6 mb-4">
                    <div className="card text-bg-info shadow-lg">
                        <div className="card-body text-center">
                            <h5>
                                Available Equipment
                            </h5>

                            <h2>
                                {availableEquipment}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card text-bg-dark shadow-lg">
                        <div className="card-body text-center">
                            <h5>
                                Active Loans
                            </h5>

                            <h2>
                                {activeLoans}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-6 mb-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h4>
                                Recent Reservations
                            </h4>

                            <ul className="list-group">
                                {recentReservations.map(
                                    reservation => (
                                        <li
                                            key={reservation.id}
                                            className="list-group-item"
                                        >
                                            <strong>
                                                Student:
                                            </strong>{" "}
                                            {
                                                reservation.studentNumber
                                            }
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h4>
                                Recent Lending Activity
                            </h4>

                            <ul className="list-group">
                                {recentLoans.map(
                                    loan => (
                                        <li
                                            key={loan.id}
                                            className="list-group-item"
                                        >
                                            <strong>
                                                Student:
                                            </strong>{" "}
                                            {
                                                loan.studentNumber
                                            }
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-lg mt-4">
                <div className="card-body">
                    <h3>
                        System Overview
                    </h3>

                    <p>
                        CELD manages equipment,
                        students, reservations,
                        lending transactions,
                        equipment returns and
                        availability tracking
                        through a centralized
                        web application.
                    </p>
                </div>
            </div>

            <footer className="mt-5 text-center text-muted">
                <hr />

                <p>
                    Campus Equipment Lending Desk (CELD)
                </p>

                <p>
                    Group 7 - Profile A
                </p>

                <p>
                    React • ASP.NET Core • EF Core • SQL Server
                </p>
            </footer>
        </div>
    );
}