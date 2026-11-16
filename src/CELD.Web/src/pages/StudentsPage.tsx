import { useState } from "react";

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "Juan Perez",
      email: "juan@email.com",
      phone: "787-111-1111",
    },
    {
      id: 2,
      name: "Maria Rivera",
      email: "maria@email.com",
      phone: "787-222-2222",
    },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert("Please complete all fields.");
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      name,
      email,
      phone,
    };

    setStudents([...students, newStudent]);

    setName("");
    setEmail("");
    setPhone("");
  };

  const handleDeleteStudent = (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Students Management</h2>

      <div className="card mb-4">
        <div className="card-header bg-success text-white">
          Add Student
        </div>

        <div className="card-body">
          <form onSubmit={handleAddStudent}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Student Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              Add Student
            </button>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-primary text-white">
          Student List ({students.length})
        </div>

        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}