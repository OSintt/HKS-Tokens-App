
const Home = ({usersOnline, user}) => (
	<div className="container">
		<div>
			<h1>
				<span>H</span>
				ker$hit
			</h1>
			<h2>4ta Gen</h2>
			<p>Bienvenido a la web de Tokens de HkerShit!</p>
			{
				user !== null ?
					<code>
						{usersOnline.length} <strong>usuarios en línea</strong>
					</code>
				: ""
			}
		</div>
	</div>
)

export default Home;