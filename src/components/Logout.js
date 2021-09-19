import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Logout = ({getUser, setAdmin}) => {
	const [path, setPath] = useState(null);

	useEffect(() => {
		localStorage.clear();
		getUser(null);
		setAdmin(false);
		setPath("/");
		window.href = "/"
	}, []);

	if (path !== null) return <Redirect to="/" />
	return (
		<>
		</>
	)
}

export default Logout;