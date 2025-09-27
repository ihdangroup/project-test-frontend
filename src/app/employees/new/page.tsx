"use client";
import { useRouter } from "next/navigation";
import EmployeeForm from "@/components/employees/EmployeeForm";
import { apiFetch } from "@/lib/api";

export default function NewEmployeePage() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      await apiFetch("/employees", {
        method: "POST",
        body: formData,
      });
      router.push("/employees");
    } catch (err) {
      console.error("Create failed", err);
      alert("Failed to create employee");
    }
  };

  return (
    <div className="card card-body">
      <h2>Add Employee</h2>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  );
}
