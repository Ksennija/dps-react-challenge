import { User } from './types';

export function getFilteredUsers(
	users: User[],
	nameFilter: string,
	cityFilter: string
): User[] {
	// 1. filter the array by name
	// a filter by first name
	// b filter by seckond name
	// 2. filter the array by city
	let filteredUsers = [...users];
	if (nameFilter) {
		const lowNameFilter = nameFilter.toLowerCase();
		filteredUsers = users.filter(
			(user) =>
				user.firstName.toLowerCase().includes(lowNameFilter) ||
				user.lastName.toLowerCase().includes(lowNameFilter)
		);
	}
	if (cityFilter) {
		filteredUsers = filteredUsers.filter(
			(user) => user.city === cityFilter
		);
	}

	return filteredUsers;
}

export function getCityOptions(users: Array<User>): string[] {
	const cities = new Array<string>();
	users.forEach((u) => {
		if (!cities.includes(u.city)) {
			cities.push(u.city);
		}
	});
	return cities;
}

export function initOldestPerCity(
	users: Array<User>,
	cities: Array<string>
): void {
	cities.forEach((city) => {
		let oldestDate = new Date().toISOString();
		const groupedByCity = getFilteredUsers(users, '', city);
		groupedByCity.forEach((user) => {
			if (new Date(user.birthday) < new Date(oldestDate)) {
				oldestDate = user.birthday;
			}
		});
		groupedByCity.forEach((u) =>
			Object.defineProperty(u, 'isOldest', {
				value: u.birthday === oldestDate,
			})
		);
	});
}
