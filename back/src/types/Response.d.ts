import 'express';

declare module 'express' {
	export interface Response {
		data: any;
	}
}
