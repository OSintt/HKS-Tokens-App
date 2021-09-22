import axios from 'axios';
import config from '../config.js';
import { useState, useEffect } from 'react';


const { DOMAIN } = config;
const CreateToken = () => {
	const [token, setToken] = useState([]);
	const [error, setError] = useState(null);
	
	const sendForm = async () => {
		try {
			await axios.post(`${DOMAIN}/api/alpha-int-os-python-testing3`, {
				lckcrypto46b: token
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			setError("Token posteado con éxito!");
		} catch(e) {
			setError(e.response.data.response || e.response.data.message);
		}
	}

	const listenToken = e => setToken(e.target.value);
	return (
		<div>
			<div>
				<h3>
					<span>C</span>
					reate Token
				</h3>
				<code>{error}</code>
				<div className="input-group">
					<div className="login-input">
						<input 
							type="text"
							placeholder="Token..."
							autoComplete="off"
							onChange={listenToken}
						/>
					</div>
					<button onClick={sendForm}>Create</button>
				</div>
			</div>
		</div>
	)
}

export default CreateToken;