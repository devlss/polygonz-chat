export const enum MESSAGE_TYPE_RQ {
	MESSAGE = 'message',
	FILE = 'file',
	GET_OLD = 'get old',
	PING = 'ping'
}

export const enum MESSAGE_TYPE_RS {
	MESSAGE = 'message',
	FILE = 'file',
	USER_CONNECTED = 'user connected',
	PONG = 'pong'
}

export interface IMApiRequest{
	type: MESSAGE_TYPE_RQ;
}
export interface IMApiResponse {
	type: MESSAGE_TYPE_RS;
}

interface IMApiFile {
	id: number;
	user_id: number;
	path: string;
	filename: string;
	content_type: string;
	content_size: number;
	upload_date: string;
}

export interface IMApiOldMessageRequest {
	type: MESSAGE_TYPE_RQ.GET_OLD;
	content: string; // Offset от начала списка
}

/**
 * Формат старого сообщения с сервера
 */
export interface IMApiOldMessageResponse extends IMApiResponse {
	type: MESSAGE_TYPE_RS.MESSAGE;
	id: number;
	chat_id: number;
	time: string;
	user_id: string;
	content: string;
	is_read: boolean;
	file?: IMApiFile;
}

export interface IMApiMessageSend {
	type: MESSAGE_TYPE_RQ.MESSAGE;
	content: string;
}

/**
 * Формат сообщения с сервера
 */
export interface IMApiMessageResponse extends IMApiResponse {
	type: MESSAGE_TYPE_RS.MESSAGE;
	id: number;
	content: string;
	user_id: number;
	time: string;
}

export interface IMApiPingRequest {
	type: MESSAGE_TYPE_RQ.PING;
}

export interface IMApiPongResponse extends IMApiResponse {
	type: MESSAGE_TYPE_RS.PONG;
}

export interface IMapiUserConnectResponse extends IMApiResponse {
	content: string; // ID пользователя который подключился
	type: MESSAGE_TYPE_RS.USER_CONNECTED;
}

export type MApiResponses = IMapiUserConnectResponse | IMApiMessageResponse | IMApiOldMessageResponse[];
export type MApiResponsTypes = IMapiUserConnectResponse | IMApiMessageResponse | IMApiOldMessageResponse;
