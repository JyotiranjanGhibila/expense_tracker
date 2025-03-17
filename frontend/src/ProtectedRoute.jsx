import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/authContexProvider";
import authServices from "./api/authServices";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { auth, setAuth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const data = await authServices.verifyingToken();
          console.log("Verifying token response:", data);
  
          if (data.success) {
            setAuth({ user: data.user, isAuthenticated: true });
          } else {
            setAuth({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          setAuth({ user: null, isAuthenticated: false });
        } finally {
          setLoading(false);
        }
      };
  
      if (!auth.isAuthenticated) {
        fetchUser();
      } else {
        setLoading(false);
      }
    }, [auth.isAuthenticated, setAuth]);
  
    if (loading) return <p>Loading...</p>;
  
    return auth.isAuthenticated ? children : <Navigate to="/login" />;
  };

  export default ProtectedRoute;