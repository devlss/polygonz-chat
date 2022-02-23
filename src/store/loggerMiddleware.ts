import {AppMiddleware} from './types';

export const loggerMiddleware: AppMiddleware = () => (next) => (action) => {
	// console.log('Exec action', action);
	return next(action);
};
