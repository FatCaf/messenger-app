import 'express';

declare module 'express' {
	export interface CustomResponse {
		data: any;
	}
}
