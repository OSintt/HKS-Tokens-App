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

function App() {
  const [admin, setAdmin] = useState(false);
  const [user, getUser] = useState(null);
  const { DOMAIN } = config;
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
  }, [url]);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <Navbar admin={admin} user={user}/>
      <Switch>
        <Route exact path="/">
          <Home />
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
          <Admin user={user}/>
        </Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
