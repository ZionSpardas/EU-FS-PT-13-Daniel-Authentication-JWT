const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			

			login: async (email, password) => {
				const options = {
				  method: 'POST',
				  headers: {
					"Content-Type": "application/json" 
				  },
				  body: JSON.stringify({
					"email": email, 
					"password": password,
				  })
				};
			  
				try {
				  const resp = await fetch('https://orange-fortnight-xj7w7wp947536gvx-3001.app.github.dev/api/token', options);
			  
				  if (resp.ok) { 
					const data = await resp.json();
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true;
				  } else {
					alert("Invalid Login Credentials");
					return false;
				  }
				} catch (err) {
				  console.log("THE ERROR: " + err);
				  return false; 
				}
			  },




			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
		}
	};
};

export default getState;
