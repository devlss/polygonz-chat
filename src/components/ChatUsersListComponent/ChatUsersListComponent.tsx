import {FC, useEffect} from 'react';
import {getAllChatUsersRequest} from '../../store/ChatUsers/actions';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {ChatUsersListItemComponent} from '../ChatUsersListItemComponent';
import type {ChatUsersListComponentProps} from './ChatUsersListComponent.types';

import './ChatUsersListComponent.scss';

export const ChatUsersListComponent: FC<ChatUsersListComponentProps> = ({chatId, className}) => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(({chatUsers}) => chatUsers.map[chatId] || []);
	const usersElements = users.map((user) => <ChatUsersListItemComponent key={user.id} user={user} isShort className="chat-users-list__item" />);

	useEffect(() => {
		dispatch(getAllChatUsersRequest(chatId));
	}, [chatId, dispatch]);

	return <div className={`chat-users-list ${className || ''}`}>{usersElements}</div>;
};
