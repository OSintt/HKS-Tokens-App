import { Link } from 'react-router-dom';
import './css/navbar.css';

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
				admin ? 
					<span>
						<Link to="/admin-panel">Admin</Link>
					</span>
				 : ""
			}
			{
				user === null ?
					<span>
						<Link to="/login">Login</Link>
					</span>
				: <span>
					<Link to="/logout">Logout</Link>
				</span>
			}
		</nav>
	);
}

export default Navbar;