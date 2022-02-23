import {IApiUpdateChatUsersRequest, IApiUser, IApiUserInfo} from '../../api/types';
import {USER_ACTION_TYPES} from './types';
import type {GetUserRequest, PutUserRequest, SetUserAction} from './types';

export function setUserAction(payload: IApiUser): SetUserAction {
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
