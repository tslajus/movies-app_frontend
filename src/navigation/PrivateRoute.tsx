import { ReactNode } from 'react';
import { useProfile } from 'providers/ProfileProvider';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  routeTo: ReactNode;
  redirectTo: string;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ routeTo, redirectTo }) => {
  const { signedIn } = useProfile();

  if (signedIn) {
    return <>{routeTo}</>;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

export default PrivateRoute;
