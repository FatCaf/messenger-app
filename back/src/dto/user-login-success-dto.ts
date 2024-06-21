export class UserLoginSuccessDto {
	constructor(
		readonly token: string,
		readonly user: {
			readonly id: string;
			readonly name: string;
			readonly email: string;
		}
	) {}
}
