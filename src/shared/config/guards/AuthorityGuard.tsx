import { FC, ReactNode } from "react";
import { Navigate } from "react-router";

interface AuthorityGuardProps {
  userRole: string;
  authority: string[];
  children: ReactNode;
}

const AuthorityGuard: FC<AuthorityGuardProps> = ({
  userRole,
  authority,
  children,
}) => {
  const hasPermission = authority.includes(userRole);

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default AuthorityGuard;
