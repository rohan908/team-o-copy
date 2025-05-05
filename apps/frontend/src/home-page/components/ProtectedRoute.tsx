import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

interface Props {
    Route: JSX.Element;
}

const ProtectedRoute = (props: Props) => {
    const { Route } = props;
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <Navigate to="/" replace />; // Redirect depending on whether logged in or not
    }
    return Route;
};

export default ProtectedRoute;
