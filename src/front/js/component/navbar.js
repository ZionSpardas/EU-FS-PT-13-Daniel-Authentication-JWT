import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();
	const handleclick = () => {
		sessionStorage.removeItem("token")
		navigate("/login")
	}
	const token = sessionStorage.getItem("token");
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{
						token && token !== "" && token !== undefined ? ""
							: (<Link to="/signup">
								<button className="btn btn-success mx-2" >Sign Up</button>
							</Link>)
					}

					{
						token && token !== "" && token !== undefined ? (<button className="btn btn-success" onClick={() => handleclick()} > Logout</button>)
							: (<Link to="/login">
								<button className="btn btn-success" >  Login</button>
							</Link>)
					}
				</div>
			</div>
		</nav>
	);
};
