import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Login } from "./login";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const token = sessionStorage.getItem("token");
	return (
		<div className="text-center mt-5">
			{token && token !== "" && token !== undefined ? (
				<div className="text-center">
					<h1 className="display-1"> You are logged in </h1>
					<h1 className="display-1">You are a boss</h1>
					</div>
			) : (
				<div>
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
			</div>
			)}
		</div>

	);
};
