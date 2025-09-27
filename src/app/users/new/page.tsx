"use client";
import { useRouter } from "next/navigation";
import UserForm from "@/components/users/UserForm";
import { apiFetch } from "@/lib/api";

export default function NewUserPage() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await apiFetch("/users", { method: "POST", body: formData });
    router.push("/users");
  };

  return (
    <div className="p-4">
      <h2>Add User</h2>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
