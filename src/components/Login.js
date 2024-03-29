import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from './config';

const Login = (props) => {
	const [username, getUsername] = useState(null);
	const [password, getPassword] = useState(null);
	const [error, setError] = useState(null);
	const [path, setPath] = useState(null);

	const { setAdmin, getUser, user } = props; 
	const { DOMAIN } = config;

	useEffect(() => {
		if (user !== null) {
			setPath("/");
		}
	}, [user])

	if (path !== null) return <Redirect to={path} />
		
	const listenPassword = e => {
		getPassword(e.target.value);
	}

	const listenUsername = e => {
		getUsername(e.target.value);
	}

	const sendForm = async e => {
		try {
			const res = await axios.post(`${DOMAIN}/api/auth/signin`, {
				username,
				password
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			localStorage.setItem('token', res.data.token);
			if (res.data.admin === true) {
				setAdmin(true);
			}
			getUser(res.data.user);
			setPath("/");
			window.location.reload();
		} catch(e) {
			setError(e.response.data.response);
		}
	}

	return (
		<div className="container-login">
			<div>
				<h1>
					<span>L</span>
					ogin 
				</h1>
				<code>{error}</code>
				<div className="input-group">
					<div className="login-input">
						<input 
							type="text"
							placeholder="Nombre de usuario..."
							autoComplete="off"
							onChange={listenUsername}
						/>
					</div>
					<div className="login-input">
						<input 
							type="password" 
							placeholder="Contraseña..."
							autoComplete="off"
							onChange={listenPassword}
						/>
					</div>
					<button onClick={sendForm}>Login</button>
				</div>
			</div>
		</div>
	);
}

export default Login;