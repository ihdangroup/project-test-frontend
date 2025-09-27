"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/types/user";
import { apiFetch } from "@/lib/api";
import UserForm from "@/components/users/UserForm";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiFetch<User>(`/users/${params.id}`);
        setUser(data);
      } catch (err) {
        console.error("Failed fetch user", err);
      }
    };
    fetchUser();
  }, [params.id]);

  const handleSubmit = async (formData: FormData) => {
    await apiFetch(`/users/${params.id}`, { method: "PUT", body: formData });
    router.push("/users");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2>Edit User</h2>
      <UserForm initialData={user} onSubmit={handleSubmit} />
    </div>
  );
}
