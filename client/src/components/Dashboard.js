import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
	const [name, setName] = useState("");
	const getName = async () => {
		try {
			const response = await fetch("/dashboard", {
				method: "GET",
				headers: { token: localStorage.token },
			});

			const parsRes = await response.json();
			

			setName(parsRes[0].name);
			
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getName();
	},[]);
	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		setAuth(false);
		toast.success("You have logged out successfully");
	};

	return (
		<Fragment>
			<h1>Dashboard </h1>
			<h3>Hello {name}</h3>
			<button className="btn btn-primary" onClick={(e) => logout(e)}>
				Log out
			</button>
		</Fragment>
	);
};

export default Dashboard;
