import {CHAT_LIST_ACTION_TYPES} from './types';
import type {
	AddAllChatsAction,
	AddChatAction,
	UpdateChatLastMessageAction,
	GetAllChatsRequest,
	SetActiveChatAction,
	DeleteChatRequest,
	CreateChatRequest,
	RemoveChatAction,
	RemoveAllChatsAction
} from './types';
import type {IApiChat, IApiChatLastMessage, IApiCreateChatRequest, IApiDeleteChatRequest} from '../../api/types';

export function addAllChatsAction(payload: IApiChat[]): AddAllChatsAction {
	return {
		type: CHAT_LIST_ACTION_TYPES.ADD_ALL,
		payload
	};
}

export function addChatAction(payload: IApiChat): AddChatAction {
	return {
		type: CHAT_LIST_ACTION_TYPES.ADD,
		payload
	};
}

export function removeChatAction(payload: IApiDeleteChatRequest): RemoveChatAction {
	return {
		type: CHAT_LIST_ACTION_TYPES.REMOVE,
		payload
	};
}

export function removeAllChatsAction(): RemoveAllChatsAction {
	return {
		type: CHAT_LIST_ACTION_TYPES.REMOVE_ALL
	};
}

export function updateChatLastMessageAction(chatId: number, lastMessage: IApiChatLastMessage): UpdateChatLastMessageAction {
	return {
		type: CHAT_LIST_ACTION_TYPES.UPDATE_LM,
		payload: {
			chatId,
			lastMessage
		}
	};
}

export function setActiveChatAction(payload: number): SetActiveChatAction {
	return {
		type: CHAT_LIST_ACTION_TYPES.SET_ACTIVE,
		payload
	};
}

export function getAllChatsRequest(limit?: number, offset?: number): GetAllChatsRequest {
	return {
		type: CHAT_LIST_ACTION_TYPES.R_GET_ALL,
		payload: {
			limit,
			offset
		}
	};
}

export function createChatRequest(payload: IApiCreateChatRequest): CreateChatRequest {
	return {
		type: CHAT_LIST_ACTION_TYPES.R_CREATE,
		payload
	};
}

export function deleteChatRequest(payload: IApiDeleteChatRequest): DeleteChatRequest {
	return {
		type: CHAT_LIST_ACTION_TYPES.R_DELETE,
		payload
	};
}
