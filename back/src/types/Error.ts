export type Error = {
	[key: string]: string;
};

export type ValidationRule = {
	[key: string]: {
		[key: string]: { pattern: RegExp };
	};
};
