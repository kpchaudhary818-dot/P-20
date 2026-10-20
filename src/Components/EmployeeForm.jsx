
import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  department: "",
  salary: "",
};

function EmployeeForm({ selectedEmployee, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        department: selectedEmployee.department,
        salary: String(selectedEmployee.salary),
      });
    } else {
      setForm(emptyForm);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...selectedEmployee,
      ...form,
      salary: Number(form.salary),
    });

    setForm(emptyForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-white p-6 shadow-md"
    >
      <h2 className="text-xl font-bold text-gray-800">
        {selectedEmployee ? "Edit Employee" : "Add Employee"}
      </h2>

      <div>
        <label className="mb-1 block font-medium text-gray-700">
          Full Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter full name"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium text-gray-700">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium text-gray-700">
          Department
        </label>
        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Enter department"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium text-gray-700">
          Salary (₹)
        </label>
        <input
          name="salary"
          type="number"
          min="0"
          value={form.salary}
          onChange={handleChange}
          placeholder="Enter salary"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {selectedEmployee ? "Update Employee" : "Add Employee"}
        </button>

        {selectedEmployee && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-gray-200 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;
