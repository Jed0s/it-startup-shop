import React, {Component} from "react";

import User from "./user";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            checkedUser: [],
            userToDelete: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3002/admin-panel')
            .then((res) => res.json())
            .then((data) => {this.setState({checkedUser: data})})
            .then(() => {console.log(this.state.checkedUser)})
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.state.userToDelete !== prevState.userToDelete) {
    //         {this.setState({userToDelete: tempArr})}
    //     }
    // }

    handleClick() {
        fetch('http://localhost:3002/delete-users')
            .then(() => {this.setState({message: 'Users are deleted'})})
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.checkedUser.map(function (user) {
                        //tempArr.push(user.name);
                        return <User name={user.username} />
                    })}
                </div>
                <button onClick={this.handleClick}>Delete users</button>
                {this.state.message}
            </div>
        )
    }
}

export default Admin;