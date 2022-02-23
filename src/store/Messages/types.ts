import {IMApiMessageResponse, IMApiMessageSend, IMApiOldMessageResponse, IMapiUserConnectResponse} from '../../api/messages.types';
import {IApiChatsMessagesTokenResponse} from '../../api/types';

export interface IMessagesState {
	map: {[id: number]: (IMapiUserConnectResponse | IMApiMessageResponse | IMApiOldMessageResponse)[]};
	tokensMap: {[id: number]: string};
}

export const enum MESSAGES_ACTION_TYPES {
	ADD_OLD = 'pchat/messages/add-old',
	ADD = 'pchat/messages/add',
	SET_TOKEN = 'pchat/messages/set-token',
	R_GET_TOKEN = 'pchat/messages/r-get-token',
	R_CONNECT = 'pchat/messages/r-connect',
	R_DISCONNECT = 'pchat/messages/r-disconnect',
	R_SEND = 'pchat/messages/r-send'
}

export interface AddOldMessagesAction {
	type: MESSAGES_ACTION_TYPES.ADD_OLD;
	payload: {chatId: number; messages: IMApiOldMessageResponse[], offset: number};
}

export interface AddMessageAction {
	type: MESSAGES_ACTION_TYPES.ADD;
	payload: {chatId: number; message: IMapiUserConnectResponse | IMApiMessageResponse};
}

export interface SetTokenAction {
	type: MESSAGES_ACTION_TYPES.SET_TOKEN;
	payload: {chatId: number; token: IApiChatsMessagesTokenResponse};
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

export type MessagesActions = AddOldMessagesAction | AddMessageAction | SetTokenAction;
export type MessagesRequests = ConnectRequest | DisconnectRequest | GetTokenRequest | SendMessageRequest;
