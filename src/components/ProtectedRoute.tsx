"use client";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, FC, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication status only on the client side
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    // Redirect to login if not logged in and not already on the login page
    if (isLoggedIn === false && pathname !== '/login') {
      router.push('/login');
    }
  }, [isLoggedIn, pathname, router]);

  // Show a loading state while checking authentication
  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Replace with your preferred loading UI
  }

  // Render children only if logged in, otherwise return null (redirect is handled by useEffect)
  return isLoggedIn ? <>{children}</> : null;
};

export default ProtectedRoute;
