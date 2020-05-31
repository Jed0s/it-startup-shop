import React, {Component} from "react";
import {useHistory} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

import '../../css/main.css';
import '../../css/login-page.css';

const PORT = 3002;

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            errorMessage: '',
            role: this.props.role
        }
        this.sendUserData = this.sendUserData.bind(this)
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.password === this.state.passCheck) {
            console.log("Passwords correct");
            this.sendUserData();
        }
        else {
            this.setState({ errorMessage: 'Passwords don\'t correct' });
        }
    }

    sendUserData = () => {
        const username = this.state.username;
        const password = this.state.password;
        let user = {
            username: username,
            password: password,
            role: this.state.role,
            operation: 'registration'
        };
        fetch (`http://localhost:${PORT}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({user: user})
        }).then((res) => res.json())
            .then((data) => {this.setState({ errorMessage: data.errorMessage });
            localStorage.setItem('userKey', data.userKey)})
            .then(() => this.setState({ redirect: true }))

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h3>Here you can register an account as an {this.state.role}</h3>
                <form onSubmit={this.handleSubmit} className='form-lp'>
                    <input type="text" name='username' placeholder='username' onChange={this.handleInputChange} autoComplete='on'/><br/>
                    <input type="text" name='password' placeholder='password' onChange={this.handleInputChange} /><br/>
                    <input type="text" name='passCheck' placeholder='password check' onChange={this.handleInputChange} /><br/>
                    <input type="submit" value='Submit'/>
                </form>
                <p className='error-msg-lp'>{this.state.errorMessage}</p>
                {this.state.errorMessage ? <hr/> : ''}
            </div>
        )
    }
}

export default Registration;