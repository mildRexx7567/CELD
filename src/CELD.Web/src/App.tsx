import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import EquipmentPage from "./pages/EquipmentPage";
import StudentsPage from "./pages/StudentsPage";
import ReservationsPage from "./pages/ReservationsPage";
import LendingPage from "./pages/LendingPage";
import Navbar from "./components/Navbar";

export default function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/dashboard">Dashboard</Link>{" | "}
                <Link to="/equipment">Equipment</Link>{" | "}
                <Link to="/students">Students</Link>{" | "}
                <Link to="/reservations">Reservations</Link>{" | "}
                <Link to="/lending">Lending</Link>
                <Navbar />
            </nav>

            <Routes>
                <Route
                    path="/"
                    element={<DashboardPage />}
                />

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/equipment"
                    element={<EquipmentPage />}
                />

                <Route
                    path="/students"
                    element={<StudentsPage />}
                />

                <Route
                    path="/reservations"
                    element={<ReservationsPage />}
                />

                <Route
                    path="/lending"
                    element={<LendingPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}