import {getUserInfo} from '../../api';
import {setUserAction} from './actions';
import {UserRequests, USER_ACTION_TYPES} from './types';
import type {AppMiddleware} from '../types';

// TODO реализовать сценарии регистрации авторизации и выхода из приложения
export const UserMiddleware: AppMiddleware =
	({dispatch}) =>
	(next) =>
	async (action: UserRequests) => {
		switch (action.type) {
			case USER_ACTION_TYPES.R_GET: {
				const info = await getUserInfo();
				dispatch(setUserAction(info));
				return;
			}
			case USER_ACTION_TYPES.R_PUT: {
				// TODO реализовать обновление пользователя
				return;
			}
			default:
				return next(action);
		}
	};
