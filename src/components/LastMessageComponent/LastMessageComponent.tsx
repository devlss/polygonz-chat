import {FC} from 'react';
import {transformTime} from '../../helpers';
import type {LastMessageComponentProps} from './LastMessageComponent.types';

import './LastMessageComponent.scss';

export const LastMessageComponent: FC<LastMessageComponentProps> = ({lastMessage}) => {
	return (
		<div className="last-message">
			<div>
				<span className="last-message__sender">{lastMessage.user.login}</span>
				<span className="last-message__time">{transformTime(lastMessage.time)}</span>
			</div>
			<div className="last-message__text">{lastMessage.content}</div>
		</div>
	);
};
