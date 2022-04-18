import {FC} from 'react';
import {LastMessageComponent} from '../LastMessageComponent';
import {LogoComponent} from '../LogoComponent';
import type {ChatListItemComponentProps} from './ChatListItemComponent.types';

import './ChatListItemComponent.scss';

export const ChatListItemComponent: FC<ChatListItemComponentProps> = ({chat, className}) => {
	return (
		<div id={chat.id.toString()} className={`chat-list-item ${className || ''}`}>
			<div className="chat-list-item__logo noevent">
				<LogoComponent src={chat.avatar} title={chat.title}></LogoComponent>
			</div>
			<div className="chat-list-item__title noevent">
				<span className="chat-list-item__title-text">{chat.title}</span>
				{!!chat.unread_count && <span className="chat-list-item__count">{chat.unread_count}</span>}
			</div>
			<div className="chat-list-item__message noevent">{chat.last_message && <LastMessageComponent lastMessage={chat.last_message} />}</div>
		</div>
	);
};
