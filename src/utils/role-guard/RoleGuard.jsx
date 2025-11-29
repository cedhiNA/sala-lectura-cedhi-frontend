const RoleGuard = ({ roles, userRole, children }) => {
  if (!roles.includes(userRole)) return null;
  return <>{children}</>;
};

export default RoleGuard;