import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ProtectedRoute = ({ children }: any) => {
  const token = useSelector((state: RootState) => state.auth.token || localStorage.getItem("accessToken"));
  if (token) {
    return <> {children}</>;
  }
  return (
    <>
      Not authorised
      <Navigate to="/auth/signin" />
    </>
  );
};

export default ProtectedRoute;
