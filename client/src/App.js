import React, {Component} from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom';
import {CLIENT_PORT} from "./secret";

import './css/main.css';
import './css/app.css';

import HomePage from "./components /home/HomePage";
import LoginPage from "./components /login-page/LoginPage";
import PasswordReset from "./components /login-page/PasswordReset";
import Startup from "./components /startup-page";
import Admin from "./components /admin-panel";
import NewPost from "./components /add-post";
import SelectedPost from "./components /startup-page/selectedPost";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  componentDidMount() {  // возможно стоит занести в SECRET ключ пользователя чтобы каждый раз не обращаться к БД. Но вряд ли
    const user = localStorage.getItem('userKey');
    console.log(`USER: ${user}`);
    fetch (`http://localhost:${CLIENT_PORT}/is-user-in-system`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({user: user})
    }).then((res) => res.json())
        .then((data) => {this.setState({username: data})})
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const user = localStorage.getItem('userKey');
    if (this.state.user !== prevState.user) {
      this.setState({username: user});
    }
  }

  handleClick = () => {
    localStorage.clear();
  }

  render() {
    return (
        <Router>
          <div>
            <div className='container'>
              <div className='navbar-username'>
                <nav>
                  <ul className='navbar'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/startups'>Startups</Link></li>
                    {this.state.username ? <li>{this.state.username}</li> : ''}
                    {this.state.username ? <li><button onClick={this.handleClick}>LOG OUT</button></li> : ''}
                  </ul>
                </nav>
              </div>
            </div>
            <hr/>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/login/:role' component={LoginPage} />
              <Route exact path='/startups' component={Startup} />
              <Route exact path='/password-reset' component={PasswordReset} />
              <Route exact path='/admin-panel' component={Admin} />
              <Route exact path='/create-post' component={NewPost} />
              <Route path='/startup/:startupID' component={SelectedPost} />
            </Switch>

          </div>
        </Router>
    );
  }
}

export default App;
