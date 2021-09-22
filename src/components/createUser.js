import { useState } from 'react';
import axios from 'axios';
import config from './config';

const CreateUser = ({setUsers, users}) => {

	const [username, getUsername] = useState(null);
	const [password, getPassword] = useState(null);
	const [error, setError] = useState(null);
	const { DOMAIN } = config;
	const listenPassword = e => {
		getPassword(e.target.value);
	}

	const listenUsername = e => {
		getUsername(e.target.value);
	}

	const sendForm = async e => {
		try {
			const res = await axios.post(`${DOMAIN}/api/auth/signup`, {
				username,
				password
			}, {
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('token')
				}
			});
			let userCopy = [...users];
			userCopy.push(res.data.user);
			setUsers(userCopy);
			
		} catch(e) {
			setError(e.response.data.response);
		}
	}

	return (
		<div>
			<div>
				<h3>
					<span>C</span>
					reate User
				</h3>
				<code>{error}</code>
				<div className="input-group">
					<div className="login-input">
						<input 
							type="text"
							placeholder="Nombre de usuario..."
							autoComplete="false"
							onChange={listenUsername}
						/>
					</div>
					<div className="login-input">
						<input 
							type="password" 
							placeholder="Contraseña..."
							autoComplete="false"
							onChange={listenPassword}
						/>
					</div>
					<button onClick={sendForm}>Create</button>
				</div>
			</div>
		</div>
	)
}

export default CreateUser;