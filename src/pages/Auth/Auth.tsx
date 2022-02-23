import {FC, useCallback, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {getUserRequest} from '../../store/User/actions';
import type {AuthProps} from './Auth.types';

import './Auth.scss';

const AUTH_APP_URL = new URL(process.env.REACT_APP_AUTH_APP_URL || '');

export const Auth: FC<AuthProps> = () => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLIFrameElement>(null);

	const messageHandler = useCallback(
		(event: MessageEvent) => {
			if (event.data === 'OK-qazwsxedc') {
				dispatch(getUserRequest());
			}
			if (event.origin !== AUTH_APP_URL.origin) return;

		},
		[dispatch]
	);

	useEffect(() => {
		window.addEventListener('message', messageHandler, false);
		return () => window.removeEventListener('message', messageHandler);
	});
	return <iframe title='auth-app' name='auth-app' src={AUTH_APP_URL.href} ref={ref} className="auth"></iframe>;
};
