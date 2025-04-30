import { useEffect, useState } from 'react';
import { fetchUsers } from './api';
import { User } from './types';
//import styles from './UsersWrapper.module.css';
import UsersTable from './components/UsersTable/UsersTable';

const UsersPanel: React.FC = () => {
	//query: string | null
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		async function fetchAllUsers() {
			const fetchedUsers = await fetchUsers();
			setUsers(fetchedUsers);
		}

		fetchAllUsers();
	}, []);

	if (users.length === 0) {
		return <p>The list is empty 🙁</p>;
	}

	return <UsersTable users={users} />;
};

export default UsersPanel;
