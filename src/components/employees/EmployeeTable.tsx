"use client";
import { FC } from "react";
import { Employee } from "@/types/employee";
import Link from "next/link";

interface Props {
  employees: Employee[];
  onDelete: (id: number) => void;
}

const EmployeeTable: FC<Props> = ({ employees, onDelete }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Position</th>
        <th>Phone</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.map((e) => (
        <tr key={e.id}>
          <td>{e.id}</td>
          <td>{e.name}</td>
          <td>{e.position}</td>
          <td>{e.phone}</td>
          <td>
            <Link href={`/employees/${e.id}`} className="btn btn-sm btn-info me-2">
              Detail
            </Link>
            <Link
              href={`/employees/edit/${e.id}`}
              className="btn btn-sm btn-primary me-2"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(e.id)}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EmployeeTable;
