import {IApiChat, IApiChatLastMessage, IApiCreateChatRequest, IApiDeleteChatRequest} from '../../api/types';

export interface IChatListState {
	list: IApiChat[];
	active?: number;
}

export interface IChatLastMessageUpdateContent {
	chatId: number;
	lastMessage: IApiChatLastMessage;
}

export const enum CHAT_LIST_ACTION_TYPES {
	ADD_ALL = 'pchat/chats/add-all',
	ADD = 'pchat/chats/add',
	REMOVE = 'pchat/chats/remove',
	REMOVE_ALL = 'pchat/chats/remove-all',
	UPDATE_LM = 'pchat/chats/update-lm',
	SET_ACTIVE = 'pchat/chats/set-active',
	R_GET_ALL = 'pchat/chats/r-get-all',
	R_CREATE = 'pchat/chats/r-create',
	R_DELETE = 'pchat/chats/r-delete'
}

export interface AddAllChatsAction {
	type: CHAT_LIST_ACTION_TYPES.ADD_ALL;
	payload: IApiChat[];
}

export interface AddChatAction {
	type: CHAT_LIST_ACTION_TYPES.ADD;
	payload: IApiChat;
}

export interface RemoveChatAction {
	type: CHAT_LIST_ACTION_TYPES.REMOVE;
	payload: IApiDeleteChatRequest;
}

export interface RemoveAllChatsAction {
	type: CHAT_LIST_ACTION_TYPES.REMOVE_ALL;
}

export interface UpdateChatLastMessageAction {
	type: CHAT_LIST_ACTION_TYPES.UPDATE_LM;
	payload: IChatLastMessageUpdateContent;
}

export interface SetActiveChatAction {
	type: CHAT_LIST_ACTION_TYPES.SET_ACTIVE;
	payload: number;
}

export interface GetAllChatsRequest {
	type: CHAT_LIST_ACTION_TYPES.R_GET_ALL;
	payload: {
		limit?: number;
		offset?: number;
	};
}

export interface CreateChatRequest {
	type: CHAT_LIST_ACTION_TYPES.R_CREATE;
	payload: IApiCreateChatRequest;
}

export interface DeleteChatRequest {
	type: CHAT_LIST_ACTION_TYPES.R_DELETE;
	payload: IApiDeleteChatRequest;
}

export type ChatListActions = AddAllChatsAction | AddChatAction | RemoveChatAction | RemoveAllChatsAction | UpdateChatLastMessageAction | SetActiveChatAction;
export type ChatListRequests = GetAllChatsRequest | CreateChatRequest | DeleteChatRequest;
