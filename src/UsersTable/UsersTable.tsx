import { useEffect, useState } from 'react';
import { fetchUsers } from '../api';
import { User } from '../types';
import styles from './UsersTable.module.css';

const UsersTable: React.FC = () => {
	//query: string | null
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		async function fetchAllUsers() {
			const fetchedUsers = await fetchUsers();
			setUsers(fetchedUsers);
			console.log(users);
		}

		fetchAllUsers();
	}, []);

	return (
		<div className={styles.table}>
			<div className={`${styles.row} ${styles.heading}`}>
				<div className={styles.sell}>Name</div>
				<div className={styles.sell}>City</div>
				<div className={styles.sell}>Birthday</div>
			</div>
			{users?.map((user) => (
				<div key={user.id} className={styles.row}>
					<div className={styles.sell}>{user.name}</div>
					<div className={styles.sell}>{user.city}</div>
					<div className={styles.sell}>
						{formatDate(user.birthday)}
					</div>
				</div>
			))}
		</div>
	);
};

function formatDate(date: string) {
	const formattedDate = new Date(date);
	return `${formattedDate.getDate()}.${
		formattedDate.getMonth() + 1
	}.${formattedDate.getFullYear()}`;
}

export default UsersTable;
