import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from './config';
import CreateUser from './createUser';
import CreateToken from './admin/CreateToken';
import { BiUser, BiRadioCircleMarked} from 'react-icons/bi';


import './css/admin.css';

const Admin = ({user, onlineUsers}) => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [path, setPath] = useState(null);
	const [username, setUsername] = useState(null);
	const [userId, setUserId] = useState(null);

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
	}, [DOMAIN]);

	useEffect(() => {
		if (user !== null) {
			setUsername(user.username);
			setUserId(user._id);
			if (user.admin === false) return setPath("/");
		} else {
			return setPath("/");
		}
	}, [user])
	
	if (path !== null) return <Redirect to="/" />	
	
	const banUser = async (id) => {
		try {
			await axios.delete(`${DOMAIN}/api/auth/users/g/${id}`, {
				headers: {
					'x-access-token': localStorage.getItem('token')
				}
			});
			let userCopy = [...users];
			userCopy.splice(userCopy.indexOf(userCopy.find(u => id === u._id)));
			setUsers(userCopy);
		} catch(e) {
			setError(e.response.data.message);
		}
	}
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
				{user !== null ? <h2>Welcome back <span>{username}</span>!</h2> : ""}
			</div>
			<div className="admin-box">
				<div className="admin-components">
					<div className="createuser-container">
						<code>{error}</code>
						<div className="createuser-box">
							<CreateUser setUsers={setUsers} users={users}/>
							<div>

								<img style={{maxWidth: '200px', filter: 'drop-shadow(0 0 10px rgb(162, 140, 192))'}}  src="https://i.pinimg.com/originals/8d/0c/41/8d0c415f65118618b763924029f0d9b5.png" />
								
							</div>
							<CreateToken />
						</div>
					</div>	

					<div className="users-container">
						<div className="users-box">
							{
								users.map(({username, admin, mod, _id}) => (
									<div className="user-card" key={_id}>
										<div className="user-header">
											<h3 className={_id === userId ? "you" : ""}>
												{username}
											</h3>
											<div className="user-icon">
												<span>
													{
														onlineUsers.includes(username) ?
														<BiRadioCircleMarked /> 
														: ""
													}
												</span>
												<span>
													<BiUser />
												</span>
											</div>
										</div>
										<div className="user-body">
											<div className="actions">
												<span>Role</span>
												<span>Actions</span>
											</div>
											<div className="data">
												<code className="is-admin">{admin ? "Admin" : mod ? "Mod" : "User"}</code>
												<span>
													{
														_id === userId ? 
															
															"Love<3" :
																<div>
																	<button onClick={() => banUser(_id)}>
																		Ban 
																	</button>
																</div>
															}						
												</span>
											</div>
											<div className="make-mod">
												<button onClick={() => makeAdmin(_id)}>
													{
														mod ? "Take mod" : "Make mod"
													}
												</button>
											</div>
										</div>
									</div>
								))
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Admin;