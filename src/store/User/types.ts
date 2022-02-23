import {IApiSignInRequest, IApiSignUpRequest, IApiUser, IApiUserInfo} from '../../api/types';

export interface IUserState {
	info?: IApiUser | null;
}

export const enum USER_ACTION_TYPES {
	SET = 'pchat/user/set',
	R_GET = 'pchat/user/r-get',
	R_PUT = 'pchat/user/r-put',
	R_LOGIN = 'pchat/user/r-login',
	R_REGISTRATION = 'pchat/user/r-registration',
	R_LOGOUT = 'pchat/user/r-logout'
}

export interface SetUserAction {
	type: USER_ACTION_TYPES.SET;
	payload?: IApiUser | null;
}

export interface GetUserRequest {
	type: USER_ACTION_TYPES.R_GET;
}

export interface PutUserRequest {
	type: USER_ACTION_TYPES.R_PUT;
	payload: IApiUserInfo;
}

export interface LoginRequest {
	type: USER_ACTION_TYPES.R_LOGIN;
	payload: IApiSignInRequest;
}

export interface RegisterRequest {
	type: USER_ACTION_TYPES.R_REGISTRATION;
	payload: IApiSignUpRequest;
}

export interface LogoutRequest {
	type: USER_ACTION_TYPES.R_LOGOUT;
}


export type UserActions = SetUserAction;
export type UserRequests = GetUserRequest | PutUserRequest | LoginRequest | RegisterRequest | LogoutRequest;
