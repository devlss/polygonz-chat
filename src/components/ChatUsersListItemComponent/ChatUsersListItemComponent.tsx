import {FC} from 'react';
import type {ChatUsersListItemComponentProps} from './ChatUsersListItemComponent.types';

import './ChatUsersListItemComponent.scss';

//TODO переделать способ добавления пользователей и убрать 'noevent'
export const ChatUsersListItemComponent: FC<ChatUsersListItemComponentProps> = ({user, isShort = false, className}) => {
	return (
		<>
			{isShort ? (
				<span className={`chat-users-list-item_inline ${className || ''}`}>{user.login}</span>
			) : (
				<div id={user.id.toString()} className={`chat-users-list-item chat-users-list-item_block ${className || ''}`}>
					<div className="chat-users-list-item__header noevent">{user.login}</div>
					<div className="noevent">
						{user.first_name} {user.second_name}
						{user.display_name ? ` (${user.display_name})` : ''}
					</div>
					<div className="noevent">{`${user.phone} ${user.email}`}</div>
				</div>
			)}
		</>
	);
};
