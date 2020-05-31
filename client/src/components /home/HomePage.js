import React, {Component} from "react";

import UserType from "./UserType";
import LastPost from "./LastPost";
import '../../css/main.css';
import '../../css/home-page.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='header-hp'>
                    <h1>IT startup shop</h1>
                    <p>Become the engine of progress</p>
                </div>
                <hr/>
                <div className='login-hp'>
                    <h2>Choose your role</h2>
                    <UserType />
                </div>
                <hr/>
                <div className='reviews-hp'>
                    <h2>Check new ideas</h2>
                    <LastPost />
                </div>
                <hr/>
                <div className='footer'>
                    <p>it-startup-shop 2020</p>
                </div>
            </div>
        )
    }
}

export default HomePage;