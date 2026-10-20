
import { useCallback, useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch employees.");
      }

      const data = await response.json();

      const formattedEmployees = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.company.name,
        salary: (user.id + 1) * 10000,
      }));

      setEmployees(formattedEmployees);
    } catch {
      setError("Unable to load employees. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // CREATE
  const handleSave = async (employeeData) => {
    setError("");
    setMessage("");

    const isEditing = Boolean(selectedEmployee);

    try {
      const response = await fetch(
        isEditing
          ? `${API_URL}/${selectedEmployee.id}`
          : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to save employee.");
      }

      const savedData = await response.json();

      if (isEditing) {
        // UPDATE
        setEmployees((previous) =>
          previous.map((employee) =>
            employee.id === selectedEmployee.id
              ? { ...employeeData, id: employee.id }
              : employee
          )
        );

        setMessage("Employee updated successfully!");
      } else {
        // Add the new employee to the displayed list
        const newEmployee = {
          ...employeeData,
          id: savedData.id ?? Date.now(),
        };

        setEmployees((previous) => [
          newEmployee,
          ...previous,
        ]);

        setMessage("Employee added successfully!");
      }

      setSelectedEmployee(null);
    } catch {
      setError("Could not save employee. Please try again.");
    }
  };

  // DELETE
  const handleDelete = async (employee) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.name}?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/${employee.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Unable to delete employee.");
      }

      setEmployees((previous) =>
        previous.filter((item) => item.id !== employee.id)
      );

      if (selectedEmployee?.id === employee.id) {
        setSelectedEmployee(null);
      }

      setMessage("Employee deleted successfully!");
    } catch {
      setError("Could not delete employee. Please try again.");
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setMessage("");
    setError("");
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-blue-700 sm:text-4xl">
          Employee Management System
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Create, view, update and delete employee records
        </p>

        {message && (
          <div
            role="status"
            className="mb-5 rounded-lg bg-green-100 p-3 text-center text-green-800"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg bg-red-100 p-3 text-center text-red-700"
          >
            {error}
          </div>
        )}

        <div className="mb-8 flex justify-end">
          <button
            onClick={fetchEmployees}
            disabled={loading}
            className="rounded-lg bg-gray-700 px-4 py-2 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            Refresh API Data
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <EmployeeForm
              selectedEmployee={selectedEmployee}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>

          <div className="lg:col-span-2">
            <EmployeeList
              employees={employees}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
