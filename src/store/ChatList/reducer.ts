import {ChatListActions, ChatListRequests, CHAT_LIST_ACTION_TYPES, IChatListState} from './types';

const initialState: IChatListState = {
	list: [],
	active: undefined
};

export const chatListReducer = (state = initialState, action: ChatListActions | ChatListRequests): IChatListState => {
	switch (action.type) {
		case CHAT_LIST_ACTION_TYPES.ADD_ALL: {
			return {list: [...state.list, ...action.payload], active: state.active};
		}
		case CHAT_LIST_ACTION_TYPES.ADD: {
			return {list: [...state.list, action.payload], active: state.active};
		}
		case CHAT_LIST_ACTION_TYPES.REMOVE: {
			const filteredList = state.list.filter((chat) => chat.id !== action.payload.chatId);
			const active = state.active === action.payload.chatId ? undefined : state.active;
			return {list: filteredList, active: active};
		}
		case CHAT_LIST_ACTION_TYPES.REMOVE_ALL: {
			return {list: [], active: undefined};
		}
		case CHAT_LIST_ACTION_TYPES.UPDATE_LM: {
			let targetChatIndex = state.list.findIndex((chat) => chat.id === action.payload.chatId);
			const targetChat = state.list[targetChatIndex];
			if (targetChat) {
				const newTargetChat = {...targetChat};
				newTargetChat.last_message = action.payload.lastMessage;
				const newList = [...state.list];
				newList[targetChatIndex] = newTargetChat;
				state.list = newList;
			}
			return state;
		}
		case CHAT_LIST_ACTION_TYPES.SET_ACTIVE: {
			const newState = {...state};
			newState.active = action.payload;
			return newState;
		}
		default:
			return state;
	}
};
