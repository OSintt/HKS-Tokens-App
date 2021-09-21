import './App.css';
import Home from './components/Home';
import Tokens from './components/Tokens';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';
import Logout from './components/Logout';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import config from './components/config';
import axios from 'axios';
import io from 'socket.io-client';

const { DOMAIN } = config;
const socket = io.connect(DOMAIN);

function App() {
  const [admin, setAdmin] = useState(false);
  const [user, getUser] = useState(null);
  const [usersOnline, setUsersOnline] = useState([]);
  const url = `${DOMAIN}/api/auth/@me`;

  useEffect(() => {
    const getAdm = async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        });
        getUser(res.data.user);
        if (res.data.admin === true) return setAdmin(true);
      } catch(e) {
        console.log(e.response.data.response);
      }
    }
    getAdm();
  }, []);

  useEffect(() => {
    socket.emit('connection:online', {
      user: localStorage.getItem("token")
    });
  }, []);


  socket.on('connection:online', data => {
    setUsersOnline(data.online)
  });

  return (
    <>
      <Navbar admin={admin} user={user}/>
      <Switch>
        <Route exact path="/">
          <Home user={user} usersOnline={usersOnline}/>
        </Route>
        <Route exact path="/tokens"> 
          <Tokens user={user}/>
        </Route>
        <Route exact path="/login">
          <Login setAdmin={setAdmin} user={user} getUser={getUser}/>
        </Route>
        <Route exact path="/logout">
          <Logout getUser={getUser} setAdmin={setAdmin}/>
        </Route>
        <Route exact path="/admin-panel">
          <Admin user={user} onlineUsers={usersOnline}/>
        </Route>
        <Route path="*">
          <Home user={user} usersOnline={usersOnline}/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
