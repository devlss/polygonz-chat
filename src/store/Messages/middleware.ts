import {getChatToken} from '../../api';
import {createConnection, disconnect, send} from '../../api/messages';
import {addMessageAction, addOldMessagesAction, resetMessagesAction, setTokenAction} from './actions';
import {updateChatLastMessageAction} from '../ChatList/actions';
import {MApiResponsTypes, MESSAGE_TYPE_RS} from '../../api/messages.types';
import {MessagesRequests, MESSAGES_ACTION_TYPES} from './types';
import type {AppMiddleware} from '../types';
import type {IApiUser} from '../../api/types';

export const messagesMiddleware: AppMiddleware = ({dispatch, getState}) => {
	const updateLastMessage = (chatId: number, currentUser: IApiUser, message: MApiResponsTypes) => {
		if (message.type === MESSAGE_TYPE_RS.MESSAGE) {
			let lastMessageUser: IApiUser | undefined;
			if (message.user_id === currentUser.id) {
				lastMessageUser = currentUser;
			} else {
				lastMessageUser = getState().chatUsers.map[chatId].find((user) => user.id === message.user_id);
			}
			if (lastMessageUser) {
				const lastMessage = {
					user: lastMessageUser,
					content: message.content,
					time: message.time
				};
				dispatch(updateChatLastMessageAction(chatId, lastMessage));
			}
		}
	};

	return (next) => async (action: MessagesRequests) => {
		switch (action.type) {
			case MESSAGES_ACTION_TYPES.R_GET_TOKEN: {
				const chatToken = await getChatToken(action.payload);
				if (chatToken) {
					dispatch(setTokenAction(action.payload, chatToken));
				}
				return;
			}
			case MESSAGES_ACTION_TYPES.R_GET_OLD:
			case MESSAGES_ACTION_TYPES.R_SEND: {
				const activeChatId = getState().chats.active;
				if (activeChatId && getState().messages.tokensMap[activeChatId]) {
					send(activeChatId, action.payload);
				} else {
					console.error('[clm] Нет подключения для отправки сообщения');
				}
				return;
			}
			case MESSAGES_ACTION_TYPES.R_CONNECT: {
				let token = getState().messages.tokensMap[action.payload];
				if (!token) {
					const chatToken = await getChatToken(action.payload);
					if (chatToken) {
						token = chatToken.token;
						dispatch(setTokenAction(action.payload, chatToken));
					}
				}
				if (token) {
					const currentUser = getState().user.info!;
					createConnection(currentUser.id, action.payload, token, {
						onClose: (chatId) => {
							dispatch(resetMessagesAction(chatId));
						},
						onMessage: (chatId, message) => {
							if (Array.isArray(message)) {
								dispatch(addOldMessagesAction(chatId, message));
								// TODO необходимо предусмотреть ситуации подгрузки старых сообщений с offset != 0
								if (message.length) {
									updateLastMessage(chatId, currentUser, message[message.length - 1]);
								}
							} else {
								dispatch(addMessageAction(chatId, message));
								updateLastMessage(chatId, currentUser, message);
							}
						}
					});
				}

				return;
			}
			case MESSAGES_ACTION_TYPES.R_DISCONNECT: {
				disconnect(action.payload);
				return;
			}
			default:
				return next(action);
		}
	};
};
