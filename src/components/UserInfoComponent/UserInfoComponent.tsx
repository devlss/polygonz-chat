import {FC, useEffect} from 'react';
import type {UserInfoComponentProps} from './UserInfoComponent.types';

import './UserInfoComponent.scss';
import {LogoComponent} from '../LogoComponent';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getUserRequest} from '../../store/User/actions';

export const UserInfoComponent: FC<UserInfoComponentProps> = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(({user}) => user.info);
	useEffect(() => {
		if (!user) {
			dispatch(getUserRequest());
		}
	}, [user, dispatch]);
	return (
		<>
			{user && (
				<div className="user-info">
					<div className="user-info__logo">
						<LogoComponent title={user.login} />
					</div>
					<div className="user-info__title">
						<span className="user-info__title-login">{user.login}</span>
						{/* {user.display_name || `${user.first_name} ${user.second_name}`} */}
					</div>
					{/* <div className="user-info__other">{`${user.phone} ${user.email}`}</div> */}
					<div className="user-info__buttons">
						<button className="icon-button icon-button_danger">
							<i className="lnr lnr-exit"></i>
						</button>
					</div>
				</div>
			)}
		</>
	);
};
