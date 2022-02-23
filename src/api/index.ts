import {exist} from '../helpers';
import {ax} from './init';
import type {
	IApiChat,
	IApiChatsMessagesTokenResponse,
	IApiCreateChatRequest,
	IApiDeleteChatRequest,
	IApiSignInRequest,
	IApiSignUpRequest,
	IApiSignUpResponce,
	IApiUnreadCountResponse,
	IApiUpdateChatUsersRequest,
	IApiUser,
	Id
} from './types';

/**
 * Запрос регистрации
 * @param data  Информация о пользователе
 */
export async function signUp(data: IApiSignUpRequest): Promise<boolean> {
	const response = await ax.post<IApiSignUpResponce>('/auth/signup', data, {responseType: 'text'});

	return Boolean(response.data.id) || Promise.reject(response);
}

/**
 * Запрос авторизации
 * @param data  Логин и пароль
 */
export async function signIn(data: IApiSignInRequest): Promise<boolean> {
	const response = await ax.post<string>('/auth/signin', data, {responseType: 'text'});

	return response.data === 'OK' || Promise.reject(response);
}

/**
 * Запрос выхода из системы
 */
export async function signOut(): Promise<boolean> {
	const response = await ax.post<string>('/auth/logout', null, {responseType: 'text'});

	return response.data === 'OK' || Promise.reject(response);
}

/**
 * Запрос информации о пользователе
 * @return  Информация о пользователе
 */
export async function getUserInfo(): Promise<IApiUser> {
	const response = await ax.get<IApiUser>('/auth/user');

	return response.data;
}

export async function getChats(limit?: number, offset?: number): Promise<IApiChat[]> {
	const query = new URLSearchParams();
	if (exist(limit)) {
		query.append('limit', '' + limit);
	}
	if (exist(offset)) {
		query.append('offset', '' + offset);
	}
	const queryString = query.toString();
	const response = await ax.get(`/chats${queryString ? '?' + queryString : ''}`);

	return response.data;
}

export async function createChat(data: IApiCreateChatRequest): Promise<Id> {
	const response = await ax.post('/chats', data);

	return response.data;
}

export async function deleteChat(data: IApiDeleteChatRequest): Promise<boolean> {
	const response = await ax.delete('/chats', {data});

	return !!response.data;
}

export async function getChatUnreadCount(id: number): Promise<IApiUnreadCountResponse> {
	const response = await ax.get(`/chats/new/${id.toString()}`);

	return response.data;
}

export async function getChatUsers(id: number): Promise<IApiUser[]> {
	const response = await ax.get(`/chats/${id.toString()}/users`);

	return Array.isArray(response.data) ? response.data : [];
}

export async function addChatUser(data: IApiUpdateChatUsersRequest): Promise<boolean> {
	const response = await ax.put<string>('/chats/users', data, {responseType: 'text'});

	return response.data === 'OK' || Promise.reject(response);
}

export async function deleteChatUser(data: IApiUpdateChatUsersRequest): Promise<boolean> {
	const response = await ax.delete<string>('/chats/users', {responseType: 'text', data});

	return response.data === 'OK' || Promise.reject(response);
}

export async function getChatToken(chatId: number): Promise<IApiChatsMessagesTokenResponse> {
	const response = await ax.post(`/chats/token/${chatId}`);

	return response.data;
}

export async function searchUsers(login: string): Promise<IApiUser[]> {
	const response = await ax.post('/user/search', {login});

	return Array.isArray(response.data) ? response.data : [];
}
