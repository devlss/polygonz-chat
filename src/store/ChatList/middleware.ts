import {createChat, deleteChat, getChats} from '../../api';
import {AppMiddleware} from '../types';
import {addAllChatsAction, addChatAction, removeChatAction} from './actions';
import {ChatListRequests, CHAT_LIST_ACTION_TYPES} from './types';

export const chatListMiddleware: AppMiddleware =
	({dispatch, getState}) =>
	(next) =>
	async (action: ChatListRequests) => {
		const userId = getState().user.info?.id!;
		switch (action.type) {
			case CHAT_LIST_ACTION_TYPES.R_CREATE: {
				const chat = await createChat(action.payload);
				dispatch(
					addChatAction({
						id: chat.id,
						title: action.payload.title,
						created_by: userId,
						unread_count: 0
					})
				);
				return;
				// const req = await new Promise((resolve, reject) => {
				// 	setTimeout(() => resolve('111'), 1000);
				// });
				// console.log('send request :>> ', req, action.payload);
			}
			case CHAT_LIST_ACTION_TYPES.R_DELETE: {
				const isOk = await deleteChat(action.payload);
				if (isOk) {
					return dispatch(removeChatAction(action.payload));
				}
				return;
			}
			case CHAT_LIST_ACTION_TYPES.R_GET_ALL: {
				const chats = await getChats(action.payload.limit, action.payload.offset);
				dispatch(addAllChatsAction(chats));
				return;
			}
			default:
				return next(action);
		}
	};
