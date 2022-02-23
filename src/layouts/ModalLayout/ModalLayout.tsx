import {FC, useEffect} from 'react';
import ReactDOM from 'react-dom';
import type {ModalLayoutProps} from './ModalLayout.types';

import './ModalLayout.scss';

const el = document.createElement('div');

export const ModalLayout: FC<ModalLayoutProps> = ({children, title, onClick}) => {
	const modalRoot = document.getElementById('portal-wrapper');
	useEffect(() => {
		modalRoot?.appendChild(el);
		return () => {
			modalRoot?.removeChild(el);
		};
	}, []);

	return ReactDOM.createPortal(
		<>
			<div onClick={() => onClick && onClick()} className="backdrop fullview"></div>
			<div className="modal fullview noevent">
				<section className="modal__section fullevent">
					<header className="modal__header">
						<h3 className="modal__header-title">{title}</h3>
						<button onClick={() => onClick && onClick()} className="icon-button icon-button_danger">
							<i className="lnr lnr-cross"></i>
						</button>
					</header>
					<div className="modal__content">{children}</div>
				</section>
			</div>
		</>,
		el
	);
	// return <div>{children}</div>
};
