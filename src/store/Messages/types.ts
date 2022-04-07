import {IMApiMessageResponse, IMApiMessageSend, IMApiOldMessageRequest, IMApiOldMessageResponse, IMapiUserConnectResponse} from '../../api/messages.types';
import {IApiChatsMessagesTokenResponse} from '../../api/types';

export interface IMessagesState {
	map: {[id: number]: (IMapiUserConnectResponse | IMApiMessageResponse | IMApiOldMessageResponse)[]};
	tokensMap: {[id: number]: string};
	activeOffset: number;
}

export const enum MESSAGES_ACTION_TYPES {
	ADD_OLD = 'pchat/messages/add-old',
	ADD = 'pchat/messages/add',
	SET_TOKEN = 'pchat/messages/set-token',
	RESET = 'pchat/messages/reset',
	R_GET_TOKEN = 'pchat/messages/r-get-token',
	R_CONNECT = 'pchat/messages/r-connect',
	R_DISCONNECT = 'pchat/messages/r-disconnect',
	R_SEND = 'pchat/messages/r-send',
	R_GET_OLD = 'pchat/messages/r-get-old'
}

export interface AddOldMessagesAction {
	type: MESSAGES_ACTION_TYPES.ADD_OLD;
	payload: {chatId: number; messages: IMApiOldMessageResponse[]; offset: number};
}

export interface AddMessageAction {
	type: MESSAGES_ACTION_TYPES.ADD;
	payload: {chatId: number; message: IMapiUserConnectResponse | IMApiMessageResponse};
}

export interface SetTokenAction {
	type: MESSAGES_ACTION_TYPES.SET_TOKEN;
	payload: {chatId: number; token: IApiChatsMessagesTokenResponse};
}

export interface MessagesResetAction {
	type: MESSAGES_ACTION_TYPES.RESET;
	payload?: {chatId: number};
}

export interface GetTokenRequest {
	type: MESSAGES_ACTION_TYPES.R_GET_TOKEN;
	payload: number;
}

export interface ConnectRequest {
	type: MESSAGES_ACTION_TYPES.R_CONNECT;
	payload: number;
}

export interface DisconnectRequest {
	type: MESSAGES_ACTION_TYPES.R_DISCONNECT;
	payload: number;
}

export interface SendMessageRequest {
	type: MESSAGES_ACTION_TYPES.R_SEND;
	payload: IMApiMessageSend;
}

export interface GetOldMessagesRequest {
	type: MESSAGES_ACTION_TYPES.R_GET_OLD;
	payload: IMApiOldMessageRequest;
}

export type MessagesActions = AddOldMessagesAction | AddMessageAction | SetTokenAction | MessagesResetAction;
export type MessagesRequests = ConnectRequest | DisconnectRequest | GetTokenRequest | SendMessageRequest | GetOldMessagesRequest;
