"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Employee } from "@/types/employee";
import { apiFetch } from "@/lib/api";
import EmployeeForm from "@/components/employees/EmployeeForm";

export default function EditEmployeePage() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await apiFetch<Employee>(`/employees/${params.id}`);
        setEmployee(data);
      } catch (err) {
        console.error("Failed to fetch employee", err);
      }
    };
    fetchEmployee();
  }, [params.id]);

  const handleSubmit = async (formData: FormData) => {
    try {
      await apiFetch(`/employees/${params.id}`, {
        method: "PUT",
        body: formData,
      });
      router.push("/employees");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update employee");
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="card card-body">
      <h2>Edit Employee</h2>
      <EmployeeForm initialData={employee} onSubmit={handleSubmit} />
    </div>
  );
}
