import {AppMiddleware} from './types';

export const loggerMiddleware: AppMiddleware = () => (next) => (action) => {
	return next(action);
};
