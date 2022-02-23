import type {IApiSignInRequest, IApiSignUpRequest, IApiUser, IApiUserInfo} from '../../api/types';
import type {GetUserRequest, PutUserRequest, SetUserAction, LoginRequest, RegisterRequest, LogoutRequest} from './types';
import {USER_ACTION_TYPES} from './types';

export function setUserAction(payload?: IApiUser | null): SetUserAction {
	return {
		type: USER_ACTION_TYPES.SET,
		payload
	};
}

export function getUserRequest(): GetUserRequest {
	return {
		type: USER_ACTION_TYPES.R_GET
	};
}

export function putUserRequest(payload: IApiUserInfo): PutUserRequest {
	return {
		type: USER_ACTION_TYPES.R_PUT,
		payload
	};
}

export function loginRequest(payload: IApiSignInRequest): LoginRequest {
	return {
		type: USER_ACTION_TYPES.R_LOGIN,
		payload
	};
}

export function registerRequest(payload: IApiSignUpRequest): RegisterRequest {
	return {
		type: USER_ACTION_TYPES.R_REGISTRATION,
		payload
	};
}

export function logoutRequest(): LogoutRequest {
	return {
		type: USER_ACTION_TYPES.R_LOGOUT
	};
}
