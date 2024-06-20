export class UserCreateDto {
	constructor(
		readonly name: string,
		readonly email: string,
		readonly password: string
	) {}
}
