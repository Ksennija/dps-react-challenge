export type User = {
	id: string;
	name: string;
	city: string;
	birthday: string;
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
