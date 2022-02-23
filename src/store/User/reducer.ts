import {IUserState, UserActions, UserRequests, USER_ACTION_TYPES} from './types';

const initialState: IUserState = {
	info: undefined
};

export const UserReducer = (state = initialState, action: UserActions | UserRequests): IUserState => {
	switch (action.type) {
		case USER_ACTION_TYPES.SET: {
			return {info: action.payload};
		}
		default:
			return state;
	}
};
