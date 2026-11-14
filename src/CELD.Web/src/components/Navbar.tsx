import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link
                    className="navbar-brand"
                    to="/dashboard"
                >
                    CELD
                </Link>

                <div className="navbar-nav">
                    <Link
                        className="nav-link"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>

                    <Link
                        className="nav-link"
                        to="/equipment"
                    >
                        Equipment
                    </Link>

                    <Link
                        className="nav-link"
                        to="/students"
                    >
                        Students
                    </Link>

                    <Link
                        className="nav-link"
                        to="/reservations"
                    >
                        Reservations
                    </Link>

                    <Link
                        className="nav-link"
                        to="/lending"
                    >
                        Lending
                    </Link>
                </div>
            </div>
        </nav>
    );
}