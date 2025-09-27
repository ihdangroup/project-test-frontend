"use client";
import AuthForm from "@/components/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    if (user) {
      router.replace("/users"); // Redirect to /users if logged in
    } else {
      setIsLoading(false); // Allow rendering if not logged in
    }
  }, [user, router]);

  if (isLoading) return <div>Loading...</div>; // Prevent flash of content
  if (user) return null; // Don’t render form if logged in

  return <AuthForm />;
}
