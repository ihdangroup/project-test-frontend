"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Employee } from "@/types/employee";
import { apiFetch } from "@/lib/api";
import EmployeeDetail from "@/components/employees/EmployeeDetail";

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await apiFetch<Employee>(`/employees/${params.id}`);
        setEmployee(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found</p>;

  return (
    <div className="card card-body">
      <h2>Employee Detail</h2>
      <EmployeeDetail employee={employee} />
      <div className="mt-3">
        <button
          className="btn btn-secondary me-2"
          onClick={() => router.push("/employees")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
