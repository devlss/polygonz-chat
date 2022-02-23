import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../auth/useAuth';

export const ProtectedRoute = ({children}: {children: JSX.Element}) => {
	const user = useAuth();
	const location = useLocation();

	return (
		<>
			{user && children}
			{user === null && <Navigate to="/login" state={{from: location}} replace />}
		</>
	);
};
