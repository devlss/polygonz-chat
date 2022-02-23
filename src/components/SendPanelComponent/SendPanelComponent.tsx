import {FC} from 'react';
import type {SendPanelComponentProps} from './SendPanelComponent.types';

import './SendPanelComponent.scss';
import {InputComponent} from '../InputComponent';
import {useAppDispatch} from '../../store/hooks';
import {sendMessasgeRequest} from '../../store/Messages/actions';

export const SendPanelComponent: FC<SendPanelComponentProps> = () => {
	const dispatch = useAppDispatch();
	return (
		<div className='send-panel'>
			<InputComponent
				placeholder="Введите сообщение"
				onSubmit={(message) => {
					if (message) {
						dispatch(sendMessasgeRequest(message));
					}
				}}
			/>
		</div>
	);
};
