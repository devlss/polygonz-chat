export interface Id {
	id: number;
}

export interface IApiUserInfo {
	first_name: string;
	second_name: string;
	display_name?: string;
	login: string;
	email: string;
	phone: string;
	avatar?: string;
}
export interface IApiUser extends Id, IApiUserInfo {}

/**
 * Запрос регистрации
 */
export interface IApiSignUpRequest extends IApiUserInfo {}

/**
 * Ответ на запрос регистрации
 */
export interface IApiSignUpResponce {
	id: number;
}

/**
 * Запрос аутентификации
 */
export interface IApiSignInRequest {
	login: string;
	password: string;
}

export interface IApiChatLastMessage {
	user: IApiUserInfo;
	time: string;
	content: string;
}

export interface IApiChat {
	id: number;
	title: string;
	avatar?: string;
	created_by: number;
	unread_count: number;
	last_message?: IApiChatLastMessage;
}

/**
 * Запрос на создание чата
 */
export interface IApiCreateChatRequest {
	title: string;
}

/**
 * Запрос на удаление чата
 */
export interface IApiDeleteChatRequest {
	chatId: number;
}

/**
 * Ответ на запрос кол-ва непрочитанных сообщений
 */
export interface IApiUnreadCountResponse {
	unread_count: number;
}

/**
 * Запрос добавления и удаления пользователей чата
 */
export interface IApiUpdateChatUsersRequest {
	chatId: number;
	users: number[];
}

/**
 * Ответ на запрос токена для подлключения к чату
 */
export interface IApiChatsMessagesTokenResponse {
	token: string;
}

/**
 * Ответ сервера с ошибкой
 */
export interface IApiBadRequestError {
	reason: string;
	body?: {
		description: string;
	};
	status?: number;
}
