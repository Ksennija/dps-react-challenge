export type User = {
	id: string;
	firstName: string;
	lastName: string;
	city: string;
	birthday: string;
	isOldest?: boolean;
};

export type FetchedUser = {
	id: string;
	firstName: string;
	lastName: string;
	address: {
		city: string;
	};
	birthDate: string;
};
