import {FC, useCallback, useEffect, useRef} from 'react';
import type {ThemeSwitchComponentProps} from './ThemeSwitchComponent.types';

import './ThemeSwitchComponent.scss';

const body = document.getElementsByTagName('body')[0];

export const ThemeSwitchComponent: FC<ThemeSwitchComponentProps> = () => {
	const themeSwitchRef = useRef<HTMLFieldSetElement>(null);

	const themeClassSwitcher = useCallback((value) => {
		body.classList.remove('light', 'os', 'dark');
		body.classList.add(value);
	}, []);
	const themeSwitchHandler = useCallback(
		(e) => {
			const value = (e.target as HTMLInputElement).value;
			themeClassSwitcher(value);
			window.localStorage.setItem('theme', value);
		},
		[themeClassSwitcher]
	);

	useEffect(() => {
		const themeSwitch = themeSwitchRef.current!;
		const savedTheme = window.localStorage.getItem('theme');
		if (!savedTheme) {
			window.localStorage.setItem('theme', 'os');
		} else {
			const radio = themeSwitch.getElementsByClassName(`theme-switch__radio--${savedTheme}`)[0] as HTMLInputElement;
			if (radio) {
				radio.checked = true;
				themeClassSwitcher(savedTheme);
			}
		}
		themeSwitch.addEventListener('change', themeSwitchHandler);
		return () => {
			themeSwitch.removeEventListener('change', themeSwitchHandler);
		};
	}, [themeClassSwitcher, themeSwitchHandler]);

	return (
		<fieldset ref={themeSwitchRef} className="theme-switch">
			<legend className="theme-switch__legend">Schema</legend>
			<input type="radio" name="theme-switch-radio" value="light" className="theme-switch__radio theme-switch__radio--light lnr lnr-sun" />
			<input
				type="radio"
				name="theme-switch-radio"
				value="os"
				className="theme-switch__radio theme-switch__radio--auto lnr lnr-text-format"
				defaultChecked
			/>
			<input type="radio" name="theme-switch-radio" value="dark" className="theme-switch__radio theme-switch__radio--dark lnr lnr-moon" />
			<div className="theme-switch__position"></div>
		</fieldset>
	);
};
