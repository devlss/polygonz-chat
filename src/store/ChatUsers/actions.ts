import {IApiUpdateChatUsersRequest, IApiUser} from '../../api/types';
import {CHAT_USERS_ACTION_TYPES} from './types';
import type {AddChatUsersAction, GetAllChatUsersRequest, AddChatUsersRequest, RemoveChatUsersRequest} from './types';

export function addChatUsersAction(id: number, users: IApiUser[]): AddChatUsersAction {
	return {
		type: CHAT_USERS_ACTION_TYPES.ADD_ALL,
		payload: {
			id,
			users
		}
	};
}

export function getAllChatUsersRequest(payload: number): GetAllChatUsersRequest {
	return {
		type: CHAT_USERS_ACTION_TYPES.R_GET_ALL,
		payload
	};
}

export function addChatUsersRequest(payload: IApiUpdateChatUsersRequest): AddChatUsersRequest {
	return {
		type: CHAT_USERS_ACTION_TYPES.R_ADD,
		payload
	};
}

export function removeChatUsersRequest(payload: IApiUpdateChatUsersRequest): RemoveChatUsersRequest {
	return {
		type: CHAT_USERS_ACTION_TYPES.R_REMOVE,
		payload
	};
}
