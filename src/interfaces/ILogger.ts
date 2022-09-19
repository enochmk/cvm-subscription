export interface IContext {
	label: string;
	requestID?: string | null;
	request?: object | null;
	response?: object | null;
	error?: object | null;
}
