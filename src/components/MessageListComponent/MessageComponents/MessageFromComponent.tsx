import {FC} from 'react';
import {transformTime} from '../../../helpers';
import type {MessageFromProps} from './MessageComponents.types';

import './MessageComponents.scss';

export const MessageFromComponent: FC<MessageFromProps> = ({message, user, className}) => {
	return (
		<div className={`message message_from ${className || ''}`}>
			<div className="message__header">
				<span className="message__header-login">{user ? user.login : message.user_id}</span>
				{user && (user.display_name || ` (${user.first_name} ${user.second_name})`)}
			</div>
			<div className="message__content">{message.content}</div>
			<div className="message__footer">{transformTime(message.time)}</div>
		</div>
	);
};
