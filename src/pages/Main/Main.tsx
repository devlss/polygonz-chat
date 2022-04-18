import {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {createChatRequest} from '../../store/ChatList/actions';
import {ChatInfoComponent} from '../../components/ChatInfoComponent';
import {ChatListComponent} from '../../components/ChatListComponent';
import {UserInfoComponent} from '../../components/UserInfoComponent';
import {InputComponent} from '../../components/InputComponent';
import {SendPanelComponent} from '../../components/SendPanelComponent';
import {MessageListComponent} from '../../components/MessageListComponent';
import {ThemeSwitchComponent} from '../../components/ThemeSwitchComponent';
import type {MainProps} from './Main.types';

import './Main.scss';

export const Main: FC<MainProps> = () => {
	const dispatch = useAppDispatch();
	const chatId = useAppSelector(({chats}) => chats.active);
	return (
		<div className="wrappr">
			<main className={`chat container theme-bg ${chatId ? 'chat_active' : ''}`}>
				<div className="chat__menu">
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
					<section className="chat__theme-switch">
						<ThemeSwitchComponent />
					</section>
				</div>
				<div className="chat__content">
					{chatId ? (
						<>
							<section className="chat__info">
								<ChatInfoComponent />
							</section>
							<section className="chat__messages">
								<MessageListComponent />
							</section>
							<section className="chat__send">
								<SendPanelComponent />
							</section>
						</>
					) : (
						<section className="chat__void">
							<h1>Информация</h1>
							Это незаконченное демонстрационное приложение. <em>Использовать только для ознакомления</em>
							<h2>Ограничения</h2>
							<ul>
								<li>Подключение создается только для 1 активного чата (вопрос сервера)</li>
								<li>Нет отправки и получения файлов (вопрос сервера)</li>
								<li>Нет загрузки информации о непрочитанных сообщениях (вопрос сервера)</li>
								<li>Нет кнопки отправки сообщения (следует использовать 'enter')</li>
								<li>Не реализована смена логотипа чатов и пользователя (вопрос сервера)</li>
								<li>Не реализовано редактирование пользователя</li>
								<li>Не реализовано удаление других пользователей чата (можно использовать старую версию чата)</li>
								<li>Не реализованы всплывающие сообщения об ошиках</li>
								<li>Не реализованы тробберы</li>
							</ul>
						</section>
					)}
				</div>
			</main>
		</div>
	);
};
