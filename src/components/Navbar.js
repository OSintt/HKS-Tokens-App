import { Link } from 'react-router-dom'
const Navbar = ({admin, user}) => {
	
	return (
		<nav>
			<span>
				<Link to="/">Home</Link>
			</span>
			<span>
				<Link to="/tokens">Tokens</Link>
			</span>
			{
				user === null ?
					<span>
						<Link to="/login">Login</Link>
					</span>
				: ""
			}
			{
				admin ? 
					<span>
						<Link to="/admin-panel">Admin</Link>
					</span>
				 : ""
			}
		</nav>
	);
}

export default Navbar;