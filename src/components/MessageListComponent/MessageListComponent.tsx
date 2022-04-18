import {FC, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {MessageConnectComponent, MessageFromComponent, MessageToComponent} from './MessageComponents';
import {throttle} from '../../helpers';
import {getOldMessasgesRequest} from '../../store/Messages/actions';
import {MESSAGE_TYPE_RS} from '../../api/messages.types';
import type {MessageListComponentProps} from './MessageListComponent.types';

import './MessageListComponent.scss';

export const MessageListComponent: FC<MessageListComponentProps> = () => {
	const messagesListRef = useRef<HTMLDivElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const stickyScrollRef = useRef<boolean>(true); // Прижат ли скролл к низу
	const cheatCounterRef = useRef<number>(0); // Необходимо для соблюдения уникальности сообщений о подключении пользователей
	const userId = useAppSelector(({user}) => user.info?.id);
	const users = useAppSelector(({chatUsers, chats}) => {
		if (chats.active) {
			return chatUsers.map[chats.active] || [];
		}
	});
	const dispatch = useAppDispatch();
	const offset = useAppSelector(({messages}) => messages.activeOffset);
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
		if (stickyScrollRef.current) {
			messagesEndRef.current?.scrollIntoView(); // TODO разобраться с {behavior: 'smooth'}
		}
	}, [messages]);

	useEffect(() => {
		let isLoading = false;
		const parent = messagesListRef.current?.parentElement;
		if (parent) {
			const loadHandler = throttle(() => {
				stickyScrollRef.current = parent.scrollHeight <= parent.offsetHeight + parent.scrollTop + 1; // HACK +1 для исправления проблем если зум < 100%
				if (offset > 0 && parent.scrollTop < 150 && !isLoading) {
					isLoading = true;
					dispatch(getOldMessasgesRequest('' + offset));
				}
			});
			loadHandler();
			parent.addEventListener('scroll', loadHandler);
			return () => {
				parent.removeEventListener('scroll', loadHandler);
			};
		}
	}, [offset, dispatch]);

	const messageComponents = messages.map((message) => {
		if (message.type === MESSAGE_TYPE_RS.MESSAGE) {
			if (message.user_id === userId) {
				return <MessageToComponent key={message.id} message={message} className="message-list__to" />;
			} else {
				const user = users?.find((user) => user.id === message.user_id);
				return <MessageFromComponent key={message.id} message={message} user={user} className="message-list__from" />;
			}
		} else if (message.type === MESSAGE_TYPE_RS.USER_CONNECTED) {
			cheatCounterRef.current += 1;
			const user = users?.find((user) => user.id === +message.content);
			return <MessageConnectComponent key={message.content + cheatCounterRef.current} message={message} user={user} />;
		}
		return <></>;
	});

	return (
		<div ref={messagesListRef} className="message-list">
			{messageComponents}
			<div ref={messagesEndRef}></div>
		</div>
	);
};
