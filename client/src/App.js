import React, { Fragment, useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function App() {
	const [isAuthanticated, setIsAuthanticated] = useState(false);
	console.log(isAuthanticated);
	const setAuth = (boolean) => {
		setIsAuthanticated(boolean);
	};

	async function isAuth() {
		try {
			const response = await fetch("http://localhost:3021/auth/is-verify", {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parsRes = await response.json();
			console.log(parsRes +"in app component");

			parsRes === true ? setIsAuthanticated(true) : setIsAuthanticated(false);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		isAuth();
	}, []);

	return (
		<Fragment>
			<Router>
				<div className="container">
					<Switch>
						<Route
							exact
							path="/login"
							render={(props) =>
								!isAuthanticated ? (
									<Login {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/dashboard" />
								)
							}
						/>
						<Route
							exact
							path="/register"
							render={(props) =>
								!isAuthanticated ? (
									<Register {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
						<Route
							exact
							path="/dashboard"
							render={(props) =>
								isAuthanticated ? (
									<Dashboard {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
					</Switch>
				</div>
			</Router>
		</Fragment>
	);
}

export default App;