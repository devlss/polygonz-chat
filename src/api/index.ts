import {exist} from '../helpers';
import {ax} from './init';
import {IApiChat, IApiChatsMessagesTokenResponse, IApiCreateChatRequest, IApiDeleteChatRequest, IApiUnreadCountResponse, IApiUpdateChatUsersRequest, IApiUser, Id} from './types';

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
	const response = await ax.put('/chats/users', data, {responseType: 'text'});

	return response.data === 'OK';
}

export async function deleteChatUser(data: IApiUpdateChatUsersRequest): Promise<boolean> {
	const response = await ax.delete('/chats/users', {responseType: 'text', data});

	return response.data === 'OK';
}

export async function getChatToken(chatId: number): Promise<IApiChatsMessagesTokenResponse> {
	const response = await ax.post(`/chats/token/${chatId}`);

	return response.data;
}

export async function searchUsers(login: string): Promise<IApiUser[]> {
	const response = await ax.post('/user/search', {login});

	return Array.isArray(response.data) ? response.data : [];
}
