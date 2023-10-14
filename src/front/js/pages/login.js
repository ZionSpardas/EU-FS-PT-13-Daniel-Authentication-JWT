import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
			<form>		
				<div className="form-outline mb-4">
					<input type="email" id="form2Example1" className="form-control" />
					<label className="form-label" for="form2Example1">Email address</label>
				</div>

			
				<div className="form-outline mb-4">
					<input type="password" id="form2Example2" className="form-control" />
					<label className="form-label" for="form2Example2">Password</label>
				</div>
				<button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>
			</form>

		</div>
	);
};
