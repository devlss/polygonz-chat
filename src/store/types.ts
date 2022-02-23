import {CombinedState, Middleware} from 'redux';
import {IChatListState} from './ChatList/types';
import {IChatUsersState} from './ChatUsers/types';
import {IMessagesState} from './Messages/types';
import {IUserState} from './User/types';

export type AppState = CombinedState<{
	user: IUserState;
	chats: IChatListState;
	chatUsers: IChatUsersState;
	messages: IMessagesState;
}>
export type AppMiddleware<T = {}> = Middleware<T, AppState>;

export interface CommonProps {
	className?: string;
}
