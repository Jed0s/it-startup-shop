import React, {Component} from "react";

import '../../css/login-page.css';

const PORT = 3002;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ''
        }
    }

    handleInputChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.checkUser();
    }

    checkUser = () => {
        let user = {
            username: this.state.username,
            password: this.state.password,
            operation: 'login'
        }
        fetch(`http://localhost:${PORT}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({user: user})
        }).then((res) => res.json())
            .then((data) => {this.setState({errorMessage: data})})
    }


    render() {
        return (
            <div>
                <h3>Log in</h3>
                <form onSubmit={this.handleSubmit} className='form-lp'>
                    <input type="text" name='username' placeholder='username' autoComplete='on' onChange={this.handleInputChange} /><br/>
                    <input type="text" name='password' placeholder='password' onChange={this.handleInputChange} /><br/>
                    <input type="submit" value='Submit'/>
                </form>
                <p className='error-msg-lp'>{this.state.errorMessage}</p>
                {this.state.errorMessage ? <hr/> : ''}
            </div>
        )
    }
}

export default Login;