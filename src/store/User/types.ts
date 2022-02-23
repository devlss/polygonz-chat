import {IApiUser, IApiUserInfo} from '../../api/types';

export interface IUserState {
	info?: IApiUser;
}

export const enum USER_ACTION_TYPES {
	SET = 'pchat/user/set',
	R_GET = 'pchat/user/r-get',
	R_PUT = 'pchat/user/r-put'
}

export interface SetUserAction {
	type: USER_ACTION_TYPES.SET;
	payload: IApiUser;
}

export interface GetUserRequest {
	type: USER_ACTION_TYPES.R_GET;
}

export interface PutUserRequest {
	type: USER_ACTION_TYPES.R_PUT;
	payload: IApiUserInfo;
}


export type UserActions = SetUserAction;
export type UserRequests = GetUserRequest | PutUserRequest;
