import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		password: "",
		role: "",
	});
	const { name, email, password, role } = inputs;

	const onChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};
	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { name, email, password, role };

			const response = await fetch("/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const parsRes = await response.json();

			if (parsRes.token) {
				localStorage.setItem("token", parsRes.token);
				toast.success("Registered successfuly");
				setAuth(true);
			} else {
				setAuth(false);
				toast.error(parsRes);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Fragment>
			<h1 className="text-center my-3">
				Welcome to CYF Capgemini Homework club webpage
			</h1>
			<br />
			<h2 className="text-center my-2">Please Register to Join the Club</h2>
			<form onSubmit={onSubmitForm}>
				<input
					type="text"
					name="name"
					placeholder="name"
					value={name}
					className="form-control my-3 "
					onChange={(e) => onChange(e)}
				/>
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

				<select
					id="role"
					name="role"
					className="form-control my-3 "
					onChange={(e) => onChange(e)}
					required
				>
					<option>Select Your Role</option>
					<option value="volunteer">Volunteer</option>
					<option value="trainee">Trainee</option>
				</select>
				<button className="btn btn-success btn-block">submit</button>
			</form>
			<Link to="/login">Login</Link>
		</Fragment>
	);
};

export default Register;
