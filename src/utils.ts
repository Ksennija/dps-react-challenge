import { User } from './types';

export function searchByName(users: User[], param: string) {
	const searchedParam = param.toLowerCase();
	return users.filter(
		(user) =>
			user.firstName.toLowerCase().includes(searchedParam) ||
			user.lastName.toLowerCase().includes(searchedParam)
	);
}

export function searchByCity(users: User[], param: string) {
	return users.filter((user) => user.city === param);
}

export function pickCities(users: Array<User>) {
	const cities = new Array<string>();
	users.forEach((u) => {
		if (!cities.includes(u.city)) {
			cities.push(u.city);
		}
	});
	return cities;
}
