
function EmployeeList({ employees, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <p className="rounded-xl bg-white p-6 text-center text-blue-600 shadow">
        Loading employees...
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold text-gray-800">
          Employee List
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Total employees: {employees.length}
        </p>
      </div>

      {employees.length === 0 ? (
        <p className="p-6 text-center text-gray-500">
          No employees found. Add an employee to get started.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Salary</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-gray-200 hover:bg-blue-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {employee.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {employee.email}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {employee.department}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    ₹{employee.salary.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(employee)}
                        className="rounded-md bg-amber-500 px-3 py-2 text-sm text-white hover:bg-amber-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(employee)}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
