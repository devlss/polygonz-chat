import {IMApiMessageResponse, IMApiOldMessageResponse, IMapiUserConnectResponse} from '../../../api/messages.types';
import {IApiUser} from '../../../api/types';
import {CommonProps} from '../../../store/types';

export interface MessageConnectComponentProps extends CommonProps {
	message: IMapiUserConnectResponse;
	user?: IApiUser;
}

export interface MessageToComponentProps extends CommonProps {
	message: IMApiMessageResponse | IMApiOldMessageResponse;
}

export interface MessageFromProps extends CommonProps {
	message: IMApiMessageResponse | IMApiOldMessageResponse;
	user?: IApiUser;
}

export const enum MESSAGE_TYPE {
	TO = 'to',
	FROM = 'from',
	ENTER = 'enter'
}
