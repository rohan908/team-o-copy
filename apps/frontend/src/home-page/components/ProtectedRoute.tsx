import {Navigate} from 'react-router-dom';
import {useLogin} from './LoginContext.tsx'

interface Props {
  Route: JSX.Element;
}

const ProtectedRoute = (props: Props) => {
  const {Route} = props;
  const { isLoggedIn, loading } = useLogin();

  if (loading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;  // Redirect depending on weather logged in or not
  }
  return Route;
}

export default ProtectedRoute;
