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
			await axios.post(`${DOMAIN}/api/auth/signup`, {
				username,
				password
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			let userCopy = [...users];
			userCopy.push({
				username,
				mod: false
			});
			setUsers(userCopy);
			
		} catch(e) {
			setError(e.response.data.response);
		}
	}

	return (
		<div>
			<div className="createuser-container">
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
						<button onClick={sendForm}>Create</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateUser;