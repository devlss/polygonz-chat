import {FC} from 'react';
import {InputComponent} from '../InputComponent';
import {useAppDispatch} from '../../store/hooks';
import {sendMessageRequest} from '../../store/Messages/actions';
import type {SendPanelComponentProps} from './SendPanelComponent.types';

import './SendPanelComponent.scss';

export const SendPanelComponent: FC<SendPanelComponentProps> = () => {
	const dispatch = useAppDispatch();
	return (
		<div className='send-panel'>
			<InputComponent
				placeholder="Введите сообщение"
				onSubmit={(message) => {
					if (message) {
						dispatch(sendMessageRequest(message));
					}
				}}
			/>
		</div>
	);
};
