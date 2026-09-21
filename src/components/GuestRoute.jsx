import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoaderCircle } from "lucide-react";

export default function GuestRoute() {
  const { user, loading } = useAuth();
  // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYTc2YzQ5YmU1NGFlZTQ5NzViMjZlYyIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc4OTg2ODc4NywiZXhwIjoxNzkwMzAwNzg3fQ.Ua-LVaD2uDGHIRx5Ik-cS_EOMqup2tW0HhqPhx3c9Ro")
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}