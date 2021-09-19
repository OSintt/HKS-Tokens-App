import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import CreateUser from './createUser';

const Admin = ({user}) => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [path, setPath] = useState(null);

	const { DOMAIN } = config;
	useEffect(() => {
		const fetchUsers = async () => {
			try { 
				const res = await axios.get(`${DOMAIN}/api/auth/users/getAll`, {	
						headers: {
							'x-access-token': localStorage.getItem('token')
						}
					
				});
				setUsers(res.data.users);
			} catch(e) {
				setError("Ha ocurrido un error");
			}
		}
		fetchUsers();
	}, []);

	useEffect(() => {
		
	}, [])

	if (user === null) return setPath("/");	
	
	if (path !== null) return <Redirect to="/" />

	const makeAdmin = async (id) => {
		try {
			const res = await axios.put(`${DOMAIN}/api/auth/users/g/` + id, {admin: true}, {
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('token')
				}
			});
			let userCopy = [...users];
			const index = userCopy.indexOf(userCopy.find(u => u._id === id));
			userCopy[index] = res.data.user;
			setUsers(userCopy);
		} catch(e) {
			setError(e.response.data.response);
		}
	}
	return (
		<div className="admin-container">
			<div className="admin-header">
				<h1>
					<span>A</span>
					dmin panel
				</h1>
				<h2>Welcome back <span>{user.username}</span>!</h2>
			</div>
			<div className="admin-components">
				<CreateUser setUsers={setUsers} users={users}/>
				<div className="users-container">
					<code>{error}</code>
					{
						users.map(({username, admin, mod, _id}) => (
							<div className="user-card" key={_id}>
								<div className="user-header">
									<h3 className={_id === user._id ? "you" : ""}>{username}</h3>
								</div>
								<div className="user-body">
									<code className="is-admin">{mod ? "Mod" : "User"}</code>
									<span>
										{
											_id === user._id ? 
												
												"You" :
													<button onClick={() => makeAdmin(_id)}>
														{
															mod ? "Take mod" : "Make mod"
														}
													</button>
												}						
									</span>
								</div>
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default Admin;