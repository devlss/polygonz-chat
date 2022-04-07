import {IMApiOldMessageResponse, MESSAGE_TYPE_RQ, IMApiMessageResponse, IMapiUserConnectResponse} from '../../api/messages.types';
import {IApiChatsMessagesTokenResponse} from '../../api/types';
import {
	AddMessageAction,
	AddOldMessagesAction,
	ConnectRequest,
	DisconnectRequest,
	GetOldMessagesRequest,
	GetTokenRequest,
	MessagesResetAction,
	MESSAGES_ACTION_TYPES,
	SendMessageRequest,
	SetTokenAction
} from './types';

export function addOldMessagesAction(chatId: number, messages: IMApiOldMessageResponse[], offset = 0): AddOldMessagesAction {
	return {
		type: MESSAGES_ACTION_TYPES.ADD_OLD,
		payload: {chatId, messages, offset}
	};
}

export function addMessageAction(chatId: number, message: IMapiUserConnectResponse | IMApiMessageResponse): AddMessageAction {
	return {
		type: MESSAGES_ACTION_TYPES.ADD,
		payload: {chatId, message}
	};
}

export function setTokenAction(chatId: number, token: IApiChatsMessagesTokenResponse): SetTokenAction {
	return {
		type: MESSAGES_ACTION_TYPES.SET_TOKEN,
		payload: {chatId, token}
	};
}

export function messagesResetAction(chatId?: number): MessagesResetAction {
	return chatId
		? {
				type: MESSAGES_ACTION_TYPES.RESET,
				payload: {chatId}
		  }
		: {
				type: MESSAGES_ACTION_TYPES.RESET
		  };
}

export function getTokenRequest(payload: number): GetTokenRequest {
	return {
		type: MESSAGES_ACTION_TYPES.R_GET_TOKEN,
		payload
	};
}

export function connectRequest(payload: number): ConnectRequest {
	return {
		type: MESSAGES_ACTION_TYPES.R_CONNECT,
		payload
	};
}

export function disconnectRequest(payload: number): DisconnectRequest {
	return {
		type: MESSAGES_ACTION_TYPES.R_DISCONNECT,
		payload
	};
}

export function sendMessasgeRequest(content: string): SendMessageRequest {
	return {
		type: MESSAGES_ACTION_TYPES.R_SEND,
		payload: {
			type: MESSAGE_TYPE_RQ.MESSAGE,
			content
		}
	};
}

export function getOldMessasgesRequest(content: string): GetOldMessagesRequest {
	return {
		type: MESSAGES_ACTION_TYPES.R_GET_OLD,
		payload: {
			type: MESSAGE_TYPE_RQ.GET_OLD,
			content
		}
	};
}
