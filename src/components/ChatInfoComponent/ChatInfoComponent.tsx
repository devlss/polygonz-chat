import {FC, useCallback, useEffect, useState} from 'react';
import {shallowEqual} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setActiveChatAction} from '../../store/ChatList/actions';
import {LogoComponent} from '../LogoComponent';
import {ChatUsersListComponent} from '../ChatUsersListComponent';
import {ModalLayout} from '../../layouts/ModalLayout';
import {ChatEditComponent} from '../ChatEditComponent';
import type {ChatInfoComponentProps} from './ChatInfoComponent.types';

import './ChatInfoComponent.scss';

export const ChatInfoComponent: FC<ChatInfoComponentProps> = ({className}) => {
	const chat = useAppSelector(({chats}) => chats.list.find((chat) => chat.id === chats.active), shallowEqual);

	const [isModal, setIsModal] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!chat) {
			setIsModal(false);
		}
	}, [chat]);

	const closeChat = useCallback(() => {
		dispatch(setActiveChatAction());
	}, [dispatch]);

	const modalHandler = useCallback(() => {
		setIsModal((current) => !current);
	}, []);

	return (
		<>
			{chat && (
				<div className={`chat-info ${className || ''}`}>
					<div className="chat-info__back-button">
						<button onClick={closeChat} className="icon-button icon-button_info">
							<i className="lnr lnr-arrow-left"></i>
						</button>
					</div>
					<div className="chat-info__logo">
						<LogoComponent src={chat.avatar} title={chat.title} />
					</div>
					<div className="chat-info__title">
						<span className="chat-info__title-text">{chat.title}</span>
					</div>
					<ChatUsersListComponent chatId={chat.id} className="chat-info__users" />
					<div className="chat-info__buttons">
						<button onClick={modalHandler} className="icon-button icon-button_info">
							<i className="lnr lnr-cog"></i>
						</button>
					</div>
				</div>
			)}
			{chat && isModal && (
				<ModalLayout title={'Настройка чата'} onClick={() => modalHandler()}>
					<ChatEditComponent chat={chat} />
				</ModalLayout>
			)}
		</>
	);
};
