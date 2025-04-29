import dpsLogo from './assets/DPS.svg';
import './App.css';
import UsersTable from './UsersTable/UsersTable';

function App() {
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<p>Your solution goes here 😊</p>
				<UsersTable />
			</div>
		</>
	);
}

export default App;
