import React, {Component} from "react";
import {Link} from "react-router-dom";

class UserType extends Component {
    render() {
        return (
            <div className='user-type'>
                <Link to='/login/executor'>
                    <div className='container-role'>
                        <img src='brain.png' alt=''/>
                        <p>Invest your brain</p>
                    </div>
                </Link>
                <div className='vl-hp'></div>
                <Link to='/login/investor'>
                    <div className='container-role'>
                        <img src='money.png' alt=""/>
                        <p>Invest your money</p>
                    </div>
                </Link>
            </div>
        )
    }
}

export default UserType;

/*
* styles in 'home-page.css'
* */