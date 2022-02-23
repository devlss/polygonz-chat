import {IApiUser} from "../../api/types";
import {CommonProps} from "../../store/types";

export interface ChatUsersListItemComponentProps extends CommonProps {
	user: IApiUser;
	isShort?: boolean;
}
