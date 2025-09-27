"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/types/user";
import { apiFetch } from "@/lib/api";
import UserDetail from "@/components/users/UserDetail";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiFetch<User>(`/users/${params.id}`);
        setUser(data);
      } catch (err) {
        console.error("Failed fetch user", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="p-4">
      <h2>User Detail</h2>
      <UserDetail user={user} />
      <div className="mt-3">
        <button
          className="btn btn-secondary me-2"
          onClick={() => router.push("/users")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
