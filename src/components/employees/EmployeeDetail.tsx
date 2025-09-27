"use client";
import { FC } from "react";
import { Employee } from "@/types/employee";

interface Props {
  employee: Employee;
}

const EmployeeDetail: FC<Props> = ({ employee }) => (
  <div className="card card-body">
    <h3>{employee.name}</h3>
    <p><b>NIK:</b> {employee.nik}</p>
    <p><b>Position:</b> {employee.position}</p>
    <p><b>Phone:</b> {employee.phone}</p>
    <p><b>Email:</b> {employee.email}</p>
    {employee.photo && (
      <img
        src={`http://localhost:4000/uploads/${employee.photo}`}
        alt={employee.name}
        width={150}
        className="mt-3"
      />
    )}
  </div>
);

export default EmployeeDetail;
