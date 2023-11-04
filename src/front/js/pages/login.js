import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const token = sessionStorage.getItem("token");
	const navigate = useNavigate();

	const submitClick = () => {
		actions.login(email, password).then(() => {
			navigate("/");
		});
	}

	return (
		<div className="container-fluid">
			{token && token !== "" && token !== undefined ? (
				"You are logged in"
			) : (
				<form>
					<div className="form-outline mb-4">
						<label className="form-label">Email address</label>
						<input
							type="email"
							className="form-control"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-outline mb-4">
						<label className="form-label">Password</label>
						<input
							type="password"
							className="form-control"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary btn-block mb-4"
						onClick={() => submitClick()}
					>
						Sign in
					</button>
				</form>
			)}
		</div>
	);
};