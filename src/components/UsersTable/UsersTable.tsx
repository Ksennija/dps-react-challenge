import { User } from '../../types';
import styles from './UsersTable.module.css';

export type Props = {
	users: User[];
};

const UsersTable: React.FC<Props> = ({ users }) => {
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
