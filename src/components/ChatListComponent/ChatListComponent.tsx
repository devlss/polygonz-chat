import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getAllChatsRequest, setActiveChatAction} from '../../store/ChatList/actions';
import {ChatListItemComponent} from '../ChatListItemComponent';
import type {ChatListComponentProps} from './ChatListComponent.types';

import './ChatListComponent.scss';
import {connectRequest, disconnectRequest} from '../../store/Messages/actions';

export const ChatListComponent: FC<ChatListComponentProps> = ({className}) => {
	const dispatch = useAppDispatch();
	const chatList = useAppSelector(({chats}) => chats.list);
	const activeChat = useAppSelector(({chats}) => chats.active);
	const chats = chatList.map((chat) => (
		<ChatListItemComponent key={chat.id} chat={chat} className={`chat-list__item${activeChat === chat.id ? ' chat-list__item_active' : ''}`} />
	));
	useEffect(() => {
		dispatch(getAllChatsRequest());
	}, []);
	useEffect(() => {
		if (activeChat) {
			dispatch(connectRequest(activeChat));
		}
		return () => {
			if (activeChat) {
				dispatch(disconnectRequest(activeChat));
			}
		};
	}, [activeChat]);
	return (
		<div
			className={`chat-list ${className || ''}`}
			onClickCapture={(event) => {
				const targetChat = +(event.target as HTMLElement).id;
				if (targetChat !== activeChat) {
					dispatch(setActiveChatAction(targetChat));
				}
			}}
		>
			{chats}
		</div>
	);
};
