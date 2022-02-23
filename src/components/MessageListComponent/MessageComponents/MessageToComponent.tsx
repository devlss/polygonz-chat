import {FC} from 'react';
import {transformTime} from '../../../helpers';
import type {MessageToComponentProps} from './MessageComponents.types';

import './MessageComponents.scss';

export const MessageToComponent: FC<MessageToComponentProps> = ({message, className}) => {
	return (
		<div className={`message message_to ${className || ''}`}>
			<div className="message__content">{message.content}</div>
			<div className="message__footer">{transformTime(message.time)}</div>
		</div>
	);
};
