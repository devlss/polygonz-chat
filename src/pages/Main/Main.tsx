import {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {createChatRequest} from '../../store/ChatList/actions';
import {ChatInfoComponent} from '../../components/ChatInfoComponent';
import {ChatListComponent} from '../../components/ChatListComponent';
import {UserInfoComponent} from '../../components/UserInfoComponent';
import {InputComponent} from '../../components/InputComponent';
import {SendPanelComponent} from '../../components/SendPanelComponent';
import {MessageListComponent} from '../../components/MessageListComponent';
import type {MainProps} from './Main.types';

import './Main.scss';

export const Main: FC<MainProps> = () => {
	const dispatch = useAppDispatch();
	const chatId = useAppSelector(({chats}) => chats.active);
	return (
		<div className="wrappr">
			<main className="chat container theme-bg">
				<section className="chat__user">
					<UserInfoComponent />
				</section>
				<section className="chat__list">
					<header className="chat__list-header">
						<InputComponent
							placeholder="Введите название нового чата"
							onSubmit={(title) => {
								if (title) {
									dispatch(createChatRequest({title}));
								}
							}}
						/>
					</header>
					<div className="chat__list-container">
						<ChatListComponent />
					</div>
				</section>

				{chatId ? (
					<>
						<section className="chat__info">
							<ChatInfoComponent />
						</section>
						<section className={`chat__messages`}>
							<MessageListComponent />
						</section>
						<section className={`chat__send`}>
							<SendPanelComponent />
						</section>
					</>
				) : (
					<div className="chat__void">
						<h1>Информация</h1>
						<span>Это незаконченная версия приложения содержащая ошибки, и сервер которого является публичным. </span>
						<em>Использовать только для ознакомления</em>

						<h2>Ограничения</h2>
						<ul>
							<li>Подключение создается только для 1 активного чата</li>
							<li>Не реализовано редактирование пользователя</li>
							<li>Не реализовано удаление других пользователей чата (можно использовать старую версию чата)</li>
							<li>Не реализована подгрузка старых сообщений при скролле списка вверх</li>
							<li>Не реализована отправка и получения файлов</li>
							<li>Не реализована смена логотипа чатов и пользователя (сервер их все равно не возвращает)</li>
							<li>Нет загрузки информации о непрочитанных сообщениях (в рамках данного сервера бесполезно)</li>
							<li>Нет кнопки отправки сообщения (следует использовать 'enter')</li>
							<li>Нет сообщений об ошиках</li>
							<li>Нет тробберов</li>
							<li>Нет переключения тем</li>
						</ul>
					</div>
				)}
			</main>
		</div>
	);
};
