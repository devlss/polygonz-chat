import {IApiChat} from "../../api/types";
import {CommonProps} from "../../store/types";

export interface ChatListItemComponentProps extends CommonProps {
	chat: IApiChat;
}
