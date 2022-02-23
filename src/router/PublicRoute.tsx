import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../auth/useAuth';

export const PublicRoute = ({children}: {children: JSX.Element}) => {
	const user = useAuth();
	const location = useLocation();

	return (
		<>
			{user && <Navigate to="/" state={{from: location}} replace />}
			{!user && children}
		</>
	);
};
