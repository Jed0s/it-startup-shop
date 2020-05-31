import React, {Component} from "react";
import {Link} from "react-router-dom";

import '../../css/login-page.css';

import Login from "./Login";
import Registration from "./Registration";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginPageActive: false,
            isUserForgetPass: false,
            role: this.props.match.params.role
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            isLoginPageActive: !this.state.isLoginPageActive
        });
    }

    render() {
        return(
            <div className='container-lp'>
                {this.state.isLoginPageActive ? <Login />
                    : <Registration role={this.state.role} /> }
                {this.state.isLoginPageActive
                    ? <div className='change-state-lp'>
                        <p><a href="" onClick={this.handleClick}>Create account</a></p>
                        <p>/</p>
                        <Link to='/password-reset'>
                            <p>Forget password?</p>
                        </Link>
                    </div>
                    : <p className='change-state-lp'><a href="" onClick={this.handleClick}>Enter in system</a></p> }
            </div>
        )
    }
}

export default LoginPage;