import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords don't match");
			return;
		}

		try {
			setError(null);
			await actions.signup(formData);
			await actions.login(formData.email, formData.password);
			navigate("/");
		} catch (error) {
			setError("An error occurred during signup.");
			console.error("Signup error:", error);
		}
	};


	return (
		<div className="container-fluid">
			<div className="col-4 mx-auto my-5">
				<div className="row">
					{store.token && store.token !== null && store.token !== "" ? (
						<div className="row text-center">
							<h5 className="text-center">You already have an account</h5>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="row m-3">
							<div className="row ">
								<div className="col-md-6 text-start mb-3">
									<label htmlFor="email" className="form-label">Email :</label>
								</div>
								<div className="col-md-6  mb-3">
									<input id="email" className="form-control" type="email" name="email" placeholder="Email" onChange={handleChange} required />
								</div>
							</div>
							<div className="row">
								<div className="col-md-6 text-start mb-3">
									<label htmlFor="password" className="form-label">Password :</label>
								</div>
								<div className="col-md-6 mb-3">
									<input id="password" className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} required />
								</div>
							</div>
							<div className="row">
								<div className="col-md-6 mb-3 text-start mx-auto">
									<label htmlFor="passwordcheck" className="form-label">Confirm Password :</label>
								</div>
								<div className="col-md-6 mb-3 mx-auto">
									<input id="passwordcheck" className="form-control" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
								</div>
							</div>

							<div className="row justify-content-center">
								<button className="col-3 btn btn-success" type="submit">Sign Up</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}