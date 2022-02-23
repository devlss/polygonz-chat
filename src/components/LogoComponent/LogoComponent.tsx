import {FC, useMemo} from 'react';
import type {LogoComponentProps} from './LogoComponent.types';

import './LogoComponent.scss';
import {generateLogo} from '../../helpers';

export const LogoComponent: FC<LogoComponentProps> = ({src, title = '@'}) => {
	let abbr;
	let colorIndex;
	const isImage = src && src.length > 0;
	[abbr, colorIndex] = useMemo(() => generateLogo(title), [title]);

	return (
		<>
			{isImage ? (
				<picture>
					<img src={src} alt="{{abbr}} logo" />
				</picture>
			) : (
				<div className={`logo logo-variant_${colorIndex}`}><span className='logo__abbr'>{abbr}</span></div>
			)}
		</>
	);
};
