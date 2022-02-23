import {useEffect, useRef} from 'react';
import {shallowEqual} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {getUserRequest} from '../store/User/actions';

export const useAuth = (initState = true) => {
	const dispatch = useAppDispatch();
	const requested = useRef(initState);
	const user = useAppSelector(({user}) => user.info, shallowEqual);

	useEffect(() => {
		if (!requested.current && !user) {
			dispatch(getUserRequest());
			requested.current = true;
		}
	}, [user, dispatch]);

	return user;
};
