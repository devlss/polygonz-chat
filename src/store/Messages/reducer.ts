import {IMessagesState, MessagesActions, MESSAGES_ACTION_TYPES} from './types';

const initialState: IMessagesState = {
	map: {},
	tokensMap: {}
};

export const messagesReducer = (state = initialState, action: MessagesActions): IMessagesState => {
	switch (action.type) {
		case MESSAGES_ACTION_TYPES.ADD_OLD: {
			const newState = {...state};

			if (action.payload.offset && newState.map[action.payload.chatId]) {
				const newList = [...action.payload.messages, ...newState.map[action.payload.chatId]];
				newState.map[action.payload.chatId] = newList;
				return newState;
			} else {
				newState.map[action.payload.chatId] = action.payload.messages;
				return newState;
			}
		}
		case MESSAGES_ACTION_TYPES.ADD: {
			const newState = {...state};
			if (newState.map[action.payload.chatId]) {
				const newList = [...newState.map[action.payload.chatId], action.payload.message];
				newState.map[action.payload.chatId] = newList;
				console.log('add :>> ', newState.map);
				return newState;
			} else {
				newState.map[action.payload.chatId] = [action.payload.message];
				return newState;
			}
		}
		case MESSAGES_ACTION_TYPES.SET_TOKEN: {
			const newKeysMap = {...state.tokensMap};
			newKeysMap[action.payload.chatId] = action.payload.token.token;
			state.tokensMap = newKeysMap;
			return state;
		}
		default:
			return state;
	}
};
