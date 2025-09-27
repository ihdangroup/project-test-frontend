"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiFetch } from "@/lib/api";
import { Employee } from "@/types/employee";
import EmployeeTable from "@/components/employees/EmployeeTable";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const data = await apiFetch<Employee[]>("/employees");
      setEmployees(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this employee?")) return;
    try {
      await apiFetch(`/employees/${id}`, { method: "DELETE" });
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="card card-body">
        <h2>Employee Management</h2>
        <a href="/employees/new" className="btn btn-success mb-3">
          + Add Employee
        </a>
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <EmployeeTable employees={employees} onDelete={handleDelete} />
        )}
      </div>
    </ProtectedRoute>
  );
}
