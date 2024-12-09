import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({
  children,
  redirectTo,
}: {
  children: React.ReactNode;
  redirectTo: string;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await axios.get("http://localhost:5000/user/validate", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, []);

  // While loading, return null or a loading spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render the children if authenticated
  return <>{children}</>;
};

export default ProtectedRoutes;
