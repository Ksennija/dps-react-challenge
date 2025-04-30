import { useEffect, useState } from 'react';
import { fetchUsers } from '../../api';
import { User } from '../../types';
import styles from './UsersWrapper.module.css';
import UsersTable from '../UsersTable/UsersTable';
import { searchByName, searchByCity, pickCities } from '../../utils';

const UsersPanel: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [searchNameParam, setSearchNameParam] = useState<string>('');
	const [searchCityParam, setSearchCityParam] = useState<string>('');
	const [cities, setCities] = useState<string[]>([]);

	useEffect(() => {
		async function fetchUsersData() {
			const fetchedUsers = await fetchUsers();

			setCities(pickCities(fetchedUsers));
			let selectedUsers = [...fetchedUsers];
			if (searchNameParam) {
				selectedUsers = searchByName(selectedUsers, searchNameParam);
			}
			if (searchCityParam) {
				selectedUsers = searchByCity(selectedUsers, searchCityParam);
			}
			setUsers(selectedUsers);
		}

		fetchUsersData();
	}, [searchNameParam, searchCityParam]);

	const handleSearchChange = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		setSearchNameParam(e.target.value);
	};

	const handleCitySelect = (
		e: React.ChangeEvent<HTMLSelectElement>
	): void => {
		setSearchCityParam(e.target.value);
	};
	return (
		<div className={styles.usersWrapper}>
			<div className={styles.searchPanel}>
				<div>
					Name
					<input
						aria-label="Search name"
						placeholder="Search"
						type="search"
						onChange={handleSearchChange}
					/>
				</div>
				<div className="dropdown">
					<label>
						City
						<select name="selectedCity" onChange={handleCitySelect}>
							<option className={styles.emptyCity} value="">
								Select city
							</option>
							{cities?.map((city) => (
								<option key={city} value={city}>
									{city}
								</option>
							))}
						</select>
					</label>
				</div>
			</div>
			<UsersTable users={users} />
		</div>
	);
};

export default UsersPanel;
