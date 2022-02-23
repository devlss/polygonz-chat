import {addChatUser, deleteChatUser, getChatUsers} from '../../api';
import {addChatUsersAction, getAllChatUsersRequest} from './actions';
import {ChatUsersRequests, CHAT_USERS_ACTION_TYPES} from './types';
import {AppMiddleware} from '../types';
import {removeChatAction} from '../ChatList/actions';

export const chatUsersMiddleware: AppMiddleware =
	({dispatch, getState}) =>
	(next) =>
	async (action: ChatUsersRequests) => {
		const userId = getState().user.info?.id!;
		switch (action.type) {
			case CHAT_USERS_ACTION_TYPES.R_GET_ALL: {
				const users = await getChatUsers(action.payload);
				dispatch(addChatUsersAction(action.payload, users));
				return;
			}
			case CHAT_USERS_ACTION_TYPES.R_ADD: {
				const isOk = await addChatUser(action.payload);
				if (isOk) {
					dispatch(getAllChatUsersRequest(action.payload.chatId));
				}
				return;
			}
			case CHAT_USERS_ACTION_TYPES.R_REMOVE: {
				const isOk = await deleteChatUser(action.payload);
				if (isOk) {
					if (userId === action.payload.users[0]) {
						return dispatch(removeChatAction(action.payload));
					} else {
						return next(action);
					}
				}
				return;
			}
			default:
				return next(action);
		}
	};
