"use client";
import Link from "next/link";
import { FC } from "react";
import { User } from "@/types/user";

interface Props {
  users: User[];
  onDelete: (id: number) => void;
}

const UserTable: FC<Props> = ({ users, onDelete }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Full Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>
            <Link href={`/users/${user.id}`}>{user.full_name}</Link>
          </td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>
            <Link href={`/users/edit/${user.id}`}>
              <button className="btn btn-sm btn-primary me-2">Edit</button>
            </Link>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(user.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;
