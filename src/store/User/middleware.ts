import {getUserInfo, signIn, signOut, signUp} from '../../api';
import {getUserRequest, setUserAction} from './actions';
import {UserRequests, USER_ACTION_TYPES} from './types';
import type {AppMiddleware} from '../types';
import {disconnect} from '../../api/messages';
import {removeAllChatsAction} from '../ChatList/actions';

// TODO реализовать сценарии регистрации авторизации и выхода из приложения
export const UserMiddleware: AppMiddleware =
	({dispatch}) =>
	(next) =>
	async (action: UserRequests) => {
		switch (action.type) {
			case USER_ACTION_TYPES.R_GET: {
				try {
					const info = await getUserInfo();
					dispatch(setUserAction(info));
				} catch (error) {
					dispatch(setUserAction(null));
					console.error('Ошибка при запросе информации о пользователе', error);
				}
				return;
			}
			case USER_ACTION_TYPES.R_PUT: {
				// TODO реализовать обновление пользователя
				return;
			}

			case USER_ACTION_TYPES.R_LOGIN: {
				try {
					await signIn(action.payload);
					dispatch(getUserRequest());
				} catch (error) {
					console.error('Ошибка при аутентификации', error);
				}
				return;
			}

			case USER_ACTION_TYPES.R_REGISTRATION: {
				try {
					await signUp(action.payload);
					dispatch(getUserRequest());
				} catch (error) {
					console.error('Ошибка при аутентификации', error);
				}
				return;
			}

			case USER_ACTION_TYPES.R_LOGOUT: {
				disconnect();
				try {
					await signOut();
					dispatch(setUserAction(null));
					dispatch(removeAllChatsAction());
				} catch (error) {
					console.error('Ошибка при выходе из системы', error);
				}
				return;
			}
			default:
				return next(action);
		}
	};
