import {ChatUsersActions, ChatUsersRequests, CHAT_USERS_ACTION_TYPES, IChatUsersState} from './types';

const initialState: IChatUsersState = {
	map: {}
};

export const chatUsersReducer = (state = initialState, action: ChatUsersActions | ChatUsersRequests): IChatUsersState => {
	switch (action.type) {
		case CHAT_USERS_ACTION_TYPES.ADD_ALL: {
			const newState = {...state};
			newState.map[action.payload.id] = [...action.payload.users];
			return newState;
		}
		case CHAT_USERS_ACTION_TYPES.R_REMOVE: {
			let map = {...state.map};
			map[action.payload.chatId] = map[action.payload.chatId].filter((user) => {
				return !action.payload.users.some((removedUserId) => removedUserId === user.id);
			});
			state.map = map;
			return state;
		}
		default:
			return state;
	}
};
