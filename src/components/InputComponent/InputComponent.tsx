import {FC, KeyboardEvent, FormEvent, ClipboardEvent, useRef, useState} from 'react';
import type {InputComponentProps} from './InputComponent.types';

import './InputComponent.scss';
import {sanitize} from '../../helpers';
import {useCallback} from 'react';

const range = document.createRange();
const selection = window.getSelection();

/**
 * Магия переноса курсора в конец 'contenteditable' поля после вставки
 * Необходимо из за остановки события 'paste' для очистки от тегов
 *
 * @param element Узел, в котором нужно перенести курсор
 */
const setCaret = (element: HTMLElement) => {
	range.selectNodeContents(element);
	range.collapse(false);
	if (selection) {
		selection.removeAllRanges();
		selection.addRange(range);
	}
};

/**
 * Принудительный скролл 'contenteditable' поля после вставки
 * Необходимо из за остановки события 'paste' для очистки от тегов
 *
 * @param element Узел, который нужно проскроллить влево
 */
const setScroll = (element: HTMLElement) => {
	element.scroll({
		top: 0,
		left: element.scrollWidth,
		behavior: 'smooth'
	});
};

// TODO возможно state не нужен, а получится разрулить на уровне css
export const InputComponent: FC<InputComponentProps> = ({placeholder, onSubmit, onInput, oneLine = true}) => {
	const [isFilled, setFilled] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const onClearHandler = useCallback(() => {
		if (ref.current) {
			ref.current.textContent = '';
		}
		if (onInput) {
			onInput('');
		}
		setFilled(false);
	}, [onInput]);

	const onKeyDownHandler = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
		if (oneLine && e.key === 'Enter') {
			e.preventDefault();
			if (onSubmit) {
				onSubmit(sanitize(ref.current?.textContent));
				onClearHandler();
			}
		}
	}, [onSubmit, oneLine, onClearHandler]);

	const handleInputContent = useCallback((content: string | null) => {
		if (onInput) {
			onInput(content);
		}
		if (!isFilled && content) {
			setFilled(true);
		} else if (isFilled && !content) {
			setFilled(false);
		}
	}, [onInput, isFilled]);

	const onInputHandler = useCallback((e: FormEvent<HTMLDivElement>) => {
		handleInputContent((e.target as HTMLElement).textContent);
	}, [handleInputContent]);

	const onPasteHandler = useCallback((e: ClipboardEvent<HTMLDivElement>) => {
		e.preventDefault();

		const text = e.clipboardData.getData('text/plain');
		(e.target as HTMLElement).textContent = text;
		setCaret(e.target as HTMLElement);
		setScroll(e.target as HTMLElement);

		handleInputContent(text);
	}, [handleInputContent]);



	return (
		<div className="input">
			<div className="input__container">
				<div
					ref={ref}
					onKeyDown={onKeyDownHandler}
					onPaste={onPasteHandler}
					onInput={onInputHandler}
					role="textbox"
					spellCheck="false"
					contentEditable
					className="input__field"
				></div>
				<span className="input__placeholder">{placeholder}</span>
				<button onClick={onClearHandler} className={`input_button icon-button icon-button_danger ${!isFilled && 'invisible'}`}>
					<i className="lnr lnr-cross"></i>
				</button>
			</div>
		</div>
	);
};
