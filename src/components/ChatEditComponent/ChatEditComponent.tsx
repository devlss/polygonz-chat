import {FC} from 'react';
import {ChatUsersEditComponent} from '../ChatUsersEditComponent';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {deleteChatRequest} from '../../store/ChatList/actions';
import {removeChatUsersRequest} from '../../store/ChatUsers/actions';
import type {ChatEditComponentProps} from './ChatEditComponent.types';

import './ChatEditComponent.scss';

export const ChatEditComponent: FC<ChatEditComponentProps> = ({chat}) => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector(({user}) => user.info?.id!);
	const owner = userId === chat.created_by;
	return (
		<div className='chat-edit'>
			<div className="chat-edit__section">
				<button
					onClick={() => {
						dispatch(removeChatUsersRequest({chatId: chat.id, users: [userId]}));
					}}
					className="chat-edit__button chat-edit__button_danger"
				>
					<span className="chat-edit__button-icon">
						<i className="lnr lnr-exit"></i>
					</span>
					<span className="chat-edit__button-text">Покинуть чат</span>
				</button>
				{owner && (
					<button
						onClick={() => {
							dispatch(deleteChatRequest({chatId: chat.id}));
						}}
						className="chat-edit__button chat-edit__button_danger"
					>
						<span className="chat-edit__button-icon">
							<i className="lnr lnr-cross"></i>
						</span>
						<span className="chat-edit__button-text">Удалить чат</span>
					</button>
				)}
			</div>
			<div className="chat-edit__section">
				<ChatUsersEditComponent chatId={chat.id} />
			</div>
		</div>
	);
};
