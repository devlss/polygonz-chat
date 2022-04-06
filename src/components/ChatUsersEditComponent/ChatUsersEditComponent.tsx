import {FC, useRef, useState} from 'react';
import {shallowEqual} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {ChatUsersListItemComponent} from '../ChatUsersListItemComponent';
import {searchUsers} from '../../api';
import {debounce} from '../../helpers';
import {IApiUser} from '../../api/types';
import {addChatUsersRequest} from '../../store/ChatUsers/actions';
import {InputComponent} from '../InputComponent';
import type {ChatUsersEditComponentProps} from './ChatUsersEditComponent.types';

import './ChatUsersEditComponent.scss';

export const ChatUsersEditComponent: FC<ChatUsersEditComponentProps> = ({chatId}) => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(({chatUsers}) => chatUsers.map[chatId], shallowEqual) || [];
	const input = useRef<string>('');
	const [search, updateSearch] = useState<IApiUser[]>([]);

	const filteredSearch = search.filter((newUser) => !users.some((chatUser) => newUser.id === chatUser.id));
	const usersElements = (filteredSearch.length ? filteredSearch : users).map((user) => (
		<ChatUsersListItemComponent className="chat-users-edit__list-item" key={user.id} user={user} />
	));

	const handleSearch = async (searchString: string) => {
		input.current = searchString;
		if (searchString) {
			const users = await searchUsers(searchString);
			updateSearch(users);
		} else {
			updateSearch([]);
		}
	};

	return (
		<div className="chat-users-edit">
			<div className="chat-users-edit__add-user">
				<h3>Добавить пользователя</h3>
				<InputComponent placeholder="Начните вводить логин" onInput={debounce(handleSearch, 500)} />
			</div>
			{filteredSearch.length ? (
				<div
					onClick={(e) => {
						dispatch(addChatUsersRequest({chatId, users: [+(e.target as HTMLElement).id]}));
					}}
					className="chat-users-edit__list chat-users-edit__list_search"
				>
					{usersElements}
				</div>
			) : (
				<>
					{!!input.current && <div className="chat-users-edit__list">Пользователи не найдены</div>}

					<div className="chat-users-edit__list chat-users-edit__list_actual">
						<h3>Текущие пользователи</h3>
						{usersElements}
					</div>
				</>
			)}
		</div>
	);
};
