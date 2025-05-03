import { useEffect, useState } from 'react';
import { fetchUsers } from '../../api';
import { User } from '../../types';
import styles from './UsersWrapper.module.css';
import UsersTable from '../UsersTable/UsersTable';
import {
	getFilteredUsers,
	getCityOptions,
	initOldestPerCity,
} from '../../utils';

const UsersPanel: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [nameFilter, setNameFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');
	const [isHighlighted, setIsHighlighted] = useState(false);

	useEffect(() => {
		async function fetchUsersData() {
			const fetchedUsers = await fetchUsers();

			setUsers(fetchedUsers);
		}

		fetchUsersData();
	}, []);

	const cityOptions = getCityOptions(users); // cities' array for filter by city
	initOldestPerCity(users, cityOptions); // user's property isOldest (per city)

	const filteredUsers = getFilteredUsers(users, nameFilter, cityFilter);

	const debounce = (
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	) => {
		let timeout: number;
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			const form = e;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				onChange(form);
			}, 1000);
		};
	};

	const handleSearchChange = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		setNameFilter(e.target.value);
	};

	const handleCitySelect = (
		e: React.ChangeEvent<HTMLSelectElement>
	): void => {
		setCityFilter(e.target.value);
	};

	const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setIsHighlighted(e.target.checked);
	};

	return (
		<>
			<div className={styles.searchPanel}>
				<div>
					<label>
						Name
						<input
							aria-label="Search by name"
							placeholder="Search"
							type="search"
							onChange={debounce((e) => handleSearchChange(e))}
						/>
					</label>
				</div>
				<div className="dropdown">
					<label>
						City
						<select
							aria-label="Search by city"
							name="selectedCity"
							onChange={handleCitySelect}
						>
							<option value="">Select city</option>
							{cityOptions.map((city) => (
								<option key={city} value={city}>
									{city}
								</option>
							))}
						</select>
					</label>
				</div>
				<div className="checkbox">
					<label className={styles.checkbox}>
						Highlight oldest <br />
						per city
						<input
							aria-label="Highlight oldest"
							type="checkbox"
							name="highlightedCheckbox"
							onChange={handleCheckbox}
							checked={isHighlighted}
						/>
					</label>
				</div>
			</div>
			<UsersTable users={filteredUsers} isHighlighted={isHighlighted} />
		</>
	);
};

export default UsersPanel;
