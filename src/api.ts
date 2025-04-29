import axios from 'axios';
import { User } from './types';

export const api = axios.create({
	baseURL: 'https://dummyjson.com/users',
	withCredentials: false,
});

export const fetchUsers = async (): Promise<User[]> => {
	const response = await api.get('');
	return parseUserData(response.data.users);
};

type FetchedUser = {
	id: string;
	firstName: string;
	lastName: string;
	address: {
		city: string;
	};
	birthDate: string;
};

function parseUserData(users: Array<FetchedUser>): Array<User> {
	return Array.from(users, (u) => {
		return {
			id: u.id,
			name: u.firstName.concat(' ', u.lastName),
			city: u.address.city,
			birthday: u.birthDate,
		};
	});
}
