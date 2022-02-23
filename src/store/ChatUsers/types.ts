import {IApiUpdateChatUsersRequest, IApiUser} from '../../api/types';

export interface IChatUsersState {
	map: {[id: number]: IApiUser[]};
}

export const enum CHAT_USERS_ACTION_TYPES {
	ADD_ALL = 'pchat/chat-users/add-all',
	R_GET_ALL = 'pchat/chat-users/r-get-all',
	R_ADD = 'pchat/chat-users/r-add',
	R_REMOVE = 'pchat/chat-users/r-remove'
}

export interface AddChatUsersAction {
	type: CHAT_USERS_ACTION_TYPES.ADD_ALL;
	payload: {id: number; users: IApiUser[]};
}

export interface GetAllChatUsersRequest {
	type: CHAT_USERS_ACTION_TYPES.R_GET_ALL;
	payload: number;
}

export interface AddChatUsersRequest {
	type: CHAT_USERS_ACTION_TYPES.R_ADD;
	payload: IApiUpdateChatUsersRequest;
}

export interface RemoveChatUsersRequest {
	type: CHAT_USERS_ACTION_TYPES.R_REMOVE;
	payload: IApiUpdateChatUsersRequest;
}

export type ChatUsersActions = AddChatUsersAction;
export type ChatUsersRequests = GetAllChatUsersRequest | AddChatUsersRequest | RemoveChatUsersRequest;
