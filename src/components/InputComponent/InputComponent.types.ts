import {SyntheticEvent} from "react";

export interface InputComponentProps {
	placeholder?: string;
	onSubmit?: (value?: string | null) => void
	onInput?: (value?: string | null) => void,
	oneLine?: boolean;
}
