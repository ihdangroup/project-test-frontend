"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "@/types/user";
import { apiFetch } from "@/lib/api";
import UserTable from "@/components/users/UserTable";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await apiFetch<User[]>("/users");
      setUsers(data);
    } catch (err) {
      console.error("Failed fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus user ini?")) return;
    await apiFetch(`/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2>User Management</h2>
      <Link href="/users/new" className="btn btn-primary mb-3">
        + Add User
      </Link>
      {loading ? <p>Loading...</p> : <UserTable users={users} onDelete={handleDelete} />}
    </div>
  );
}
