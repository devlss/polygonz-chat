import {FC, useEffect, useRef} from 'react';
import {useAppSelector} from '../../store/hooks';
import {MESSAGE_TYPE_RS} from '../../api/messages.types';
import {MessageConnectComponent, MessageFromComponent, MessageToComponent} from './MessageComponents';
import type {MessageListComponentProps} from './MessageListComponent.types';

import './MessageListComponent.scss';

export const MessageListComponent: FC<MessageListComponentProps> = () => {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const userId = useAppSelector(({user}) => user.info?.id);
	const users = useAppSelector(({chatUsers, chats}) => {
		if (chats.active) {
			return chatUsers.map[chats.active] || [];
		}
	});
	const messages = useAppSelector(
		({messages, chats}) => {
			if (chats.active) {
				return messages.map[chats.active] || [];
			}
			return [];
		},
		(left, right) => left.length === right.length
	);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
	};

	const messageComponents = messages.map((message) => {
		if (message.type === MESSAGE_TYPE_RS.MESSAGE) {
			if (message.user_id === userId) {
				return <MessageToComponent key={message.id} message={message} className="message-list__to" />;
			} else {
				const user = users?.find((user) => user.id === message.user_id);
				return <MessageFromComponent key={message.id} message={message} user={user} className="message-list__from" />;
			}
		} else if (message.type === MESSAGE_TYPE_RS.USER_CONNECTED) {
			const user = users?.find((user) => user.id === +message.content);
			return <MessageConnectComponent key={message.content} message={message} user={user} />;
		}
		return <></>;
	});

	return (
		<div className="message-list">
			{messageComponents} <div id="qwert" ref={messagesEndRef}></div>
		</div>
	);
};
