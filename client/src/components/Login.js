import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { email, password } = inputs;
	const onChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};
	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { email, password };

			const response = await fetch("http://localhost:3021/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const parsRes = await response.json();
			if (parsRes.token) {
				localStorage.setItem("token", parsRes.token);
				setAuth(true);
				toast.success("Login successfully!");
			} else {
				console.log("Logging unauthraised");
				setAuth(false);
				toast.error(parsRes);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
			<h1 className="text-center my-5">Login</h1>
			<form onSubmit={onSubmitForm}>
				<input
					type="email"
					name="email"
					placeholder="email"
					value={email}
					className="form-control my-3 "
					onChange={(e) => onChange(e)}
				/>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="password"
					className="form-control my-3 "
					onChange={(e) => onChange(e)}
				/>
				<button className="btn btn-success btn-block">submit</button>
			</form>
			<Link to="/register">Register</Link>
		</Fragment>
	);
};

export default Login;
