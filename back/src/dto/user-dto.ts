export class UserDto {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly email: string
	) {}
}

export class UserDtoWithPassword extends UserDto {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly email: string,
		readonly password: string
	) {
		super(id, name, email);
	}
}
