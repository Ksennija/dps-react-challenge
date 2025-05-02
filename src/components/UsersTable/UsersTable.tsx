import { User } from '../../types';
import styles from './UsersTable.module.css';

export type UserTableProps = {
	users: User[];
	isHighlighted: boolean;
};

const UsersTable: React.FC<UserTableProps> = ({ users, isHighlighted }) => {
	if (users.length === 0) {
		return <p>The list is empty 🙁</p>;
	}

	return (
		<div className={styles.table}>
			<div className={`${styles.row} ${styles.heading}`}>
				<div className={styles.cell}>Name</div>
				<div className={styles.cell}>City</div>
				<div className={styles.cell}>Birthday</div>
			</div>
			<div className={styles.rows}>
				{users?.map((user) => (
					<div
						key={user.id}
						className={`${styles.row} ${
							isHighlighted && user.isOldest
								? styles.highlighted
								: ''
						}`}
					>
						<div className={styles.cell}>
							{user.firstName.concat(' ', user.lastName)}
						</div>
						<div className={styles.cell}>{user.city}</div>
						<div className={styles.cell}>
							{formatDate(user.birthday)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default UsersTable;

function formatDate(date: string) {
	const formattedDate = new Date(date);
	return `${formattedDate.getDate()}.${
		formattedDate.getMonth() + 1
	}.${formattedDate.getFullYear()}`;
}
