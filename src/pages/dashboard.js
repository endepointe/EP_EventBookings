import React from 'react';
import { login, isAuthenticated, getProfile } from "../utils/auth"
import DashboardComponent from '../components/dashboard/DashboardComponent';

const Dashboard = () => {
	if (!isAuthenticated()) {
		login();	
		return <div>redirecting to login</div>
	}

	const user = getProfile();

	return (
		<DashboardComponent user={user}/>
	);
}
export default Dashboard;