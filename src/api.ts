import axios from 'axios';
import { User, FetchedUser } from './types';

export const api = axios.create({
	baseURL: 'https://dummyjson.com/users',
	withCredentials: false,
});

export const fetchUsers = async (): Promise<User[]> => {
	const response = await api.get('');
	return parseUserData(response.data.users);
};

function parseUserData(users: Array<FetchedUser>): Array<User> {
	return Array.from(users, (u) => {
		return {
			id: u.id,
			firstName: u.firstName,
			lastName: u.lastName,
			city: u.address.city,
			birthday: u.birthDate,
		};
	});
}
