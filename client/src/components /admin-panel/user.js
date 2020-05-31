import React, {Component} from "react";
import '../../css/admin-panel.css'

class User extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className='display-flex'>
                <input type="checkbox"/>
                <p>{this.props.name}</p>
            </div>
        )
    }
}

export default User;