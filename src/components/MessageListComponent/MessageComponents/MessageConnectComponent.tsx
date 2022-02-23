import {FC} from 'react';
import type {MessageConnectComponentProps} from './MessageComponents.types';

import './MessageComponents.scss';

export const MessageConnectComponent: FC<MessageConnectComponentProps> = ({message, user, className}) => {
	return (
		<div className={`message message_connect ${className || ''}`}>
			<div className="message__content">{`${user ? user.login : message.content} подключился`}</div>
		</div>
	);
};
