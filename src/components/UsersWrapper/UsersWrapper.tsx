import { useEffect, useState } from 'react';
import { fetchUsers } from '../../api';
import { User } from '../../types';
import styles from './UsersWrapper.module.css';
import UsersTable from '../UsersTable/UsersTable';

const UsersPanel: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [searchByNameParam, setSearchByNameParam] = useState<string>('');

	useEffect(() => {
		async function fetchAllUsers() {
			let selectedUsers = await fetchUsers();
			if (searchByNameParam) {
				selectedUsers = searchByName(selectedUsers, searchByNameParam);
			}
			setUsers(selectedUsers);
		}

		fetchAllUsers();
	}, [searchByNameParam]);

	const handleSearchChange = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		setSearchByNameParam(e.target.value);
	};

	return (
		<div className={styles.usersWrapper}>
			<div className={styles.searchPanel}>
				<div>
					<input
						id="q"
						aria-label="Search name"
						placeholder="Search"
						type="search"
						onChange={handleSearchChange}
					/>
				</div>
			</div>
			<UsersTable users={users} />
		</div>
	);
};

export default UsersPanel;

function searchByName(users: User[], param: string) {
	const searchedParam = param.toLowerCase();
	return users.filter(
		(user) =>
			user.firstName.toLowerCase().includes(searchedParam) ||
			user.lastName.toLowerCase().includes(searchedParam)
	);
}
