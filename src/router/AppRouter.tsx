import {Routes, Route, Navigate} from 'react-router-dom';
import {Auth} from '../pages/Auth';
import {Main} from '../pages/Main';
import {useAuth} from '../auth/useAuth';
import {ProtectedRoute} from './ProtectedRoute';
import {PublicRoute} from './PublicRoute';

export const AppRouter = () => {
	useAuth(false);
	return (
		<Routes>
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<Main />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/login"
				element={
					<PublicRoute>
						<Auth />
					</PublicRoute>
				}
			/>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};
