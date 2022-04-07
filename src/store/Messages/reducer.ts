import {IMessagesState, MessagesActions, MESSAGES_ACTION_TYPES} from './types';

/**
 * Размер ответа со списком старых сообщений
 */
const CHUNK = 20;

const initialState: IMessagesState = {
	map: {},
	tokensMap: {},
	activeOffset: 0
};

export const messagesReducer = (state = initialState, action: MessagesActions): IMessagesState => {
	switch (action.type) {
		case MESSAGES_ACTION_TYPES.ADD_OLD: {
			const newState = {...state};
			if (newState.map[action.payload.chatId]) {
				const newList = [...action.payload.messages, ...newState.map[action.payload.chatId]];
				newState.map[action.payload.chatId] = newList;
			} else {
				newState.map[action.payload.chatId] = action.payload.messages;
			}
			if (action.payload.messages.length === CHUNK) {
				newState.activeOffset += CHUNK;
			} else {
				newState.activeOffset = -1;
			}
			return newState;
		}
		case MESSAGES_ACTION_TYPES.ADD: {
			const newState = {...state};
			if (newState.map[action.payload.chatId]) {
				const newList = [...newState.map[action.payload.chatId], action.payload.message];
				newState.map[action.payload.chatId] = newList;
			} else {
				newState.map[action.payload.chatId] = [action.payload.message];
			}
			return newState;
		}
		case MESSAGES_ACTION_TYPES.SET_TOKEN: {
			const newKeysMap = {...state.tokensMap};
			newKeysMap[action.payload.chatId] = action.payload.token.token;
			state.tokensMap = newKeysMap;
			return state;
		}
		case MESSAGES_ACTION_TYPES.RESET: {
			const newState = {...state};
			if (action.payload) {
				delete newState.map[action.payload.chatId];
				delete newState.tokensMap[action.payload.chatId];
			} else {
				newState.map = {};
				newState.tokensMap = {};
			}
			newState.activeOffset = 0;
			return newState;
		}
		default:
			return state;
	}
};
