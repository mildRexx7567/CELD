import { useEffect, useState } from "react";
import { celdApi } from "../api/celdApi";

type Student = {
    studentNumber: string;
    firstName: string;
    lastName: string;
    email: string;
};

export default function StudentsPage() {
    const [students, setStudents] =
        useState<Student[]>([]);

    const [studentNumber, setStudentNumber] =
        useState("");

    const [firstName, setFirstName] =
        useState("");

    const [lastName, setLastName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const loadStudents = () => {
        celdApi
            .get("/students")
            .then(response =>
                setStudents(response.data));
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const createStudent = async () => {
        await celdApi.post(
            "/students",
            {
                studentNumber,
                firstName,
                lastName,
                email
            });

        setStudentNumber("");
        setFirstName("");
        setLastName("");
        setEmail("");

        loadStudents();
    };

    return (
        <div className="container mt-4">
            <h1>Students</h1>

            <div className="card shadow p-3 mb-4">
                <h3 className="mb-3">
                    Create Student
                </h3>

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
                    className="form-control mb-2"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e =>
                        setFirstName(
                            e.target.value
                        )
                    }
                />

                <input
                    className="form-control mb-2"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e =>
                        setLastName(
                            e.target.value
                        )
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={e =>
                        setEmail(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-success"
                    onClick={createStudent}
                >
                    Create Student
                </button>
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <h3>Student Directory</h3>

                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Student Number</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>

                        <tbody>
                            {students.map(student => (
                                <tr
                                    key={
                                        student.studentNumber
                                    }
                                >
                                    <td>
                                        <span className="badge bg-primary">
                                            {
                                                student.studentNumber
                                            }
                                        </span>
                                    </td>

                                    <td>
                                        <strong>
                                            {
                                                student.firstName
                                            }
                                        </strong>{" "}
                                        {
                                            student.lastName
                                        }
                                    </td>

                                    <td>
                                        {student.email}
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