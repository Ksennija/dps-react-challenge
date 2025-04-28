import axios from 'axios';
import { User } from './types';

export const api = axios.create({
	baseURL: 'https://dummyjson.com/users',
	withCredentials: false,
});

export const fetchUsers = async (): Promise<User[]> => {
	const response = await api.get('');
	console.log(response.data);
	return response.data;
};
