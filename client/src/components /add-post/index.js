import React, {Component} from "react";

import '../../css/main.css';
//import '../../css/login-page.css';
import '../../css/add-post.css';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title: '',
            shortDescription: '',
            fullDescription: '',
            cityCenter: '',
            requestedMoney: 0
        }
    }

    getAutoFillData = () => {
        fetch('http://localhost:3002/get-auto-fill-data')
            .then((res) => res.json())
            //.then((data) => console.log(data))
            .then((data) => {this.setState({
                title: data.title,
                shortDescription: data.shortDescription,
                fullDescription: data.fullDescription,
                cityCenter: data.cityCenter,
                requestedMoney: data.requestedMoney
            })})
    }

    sendPostData = () => {
        let post = {
            title: this.state.title,
            shortDescription: this.state.shortDescription,
            fullDescription: this.state.fullDescription,
            cityCenter: this.state.cityCenter,
            requestedMoney: this.state.requestedMoney
        };
        fetch('http://localhost:3002/create-post', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({post: post})
        }).then((res) => res.json())
    }

    handleAutoFill = (e) => {
        this.getAutoFillData();
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.sendPostData();
    }

    render() {
        return(
            <div className='container-ap'>
                <h2>Here you can post your own startup</h2>
                <p>Please, fill all of these fields</p>
                <form onSubmit={this.handleSubmit} className='form-ap'>
                    <input type="text" className='input-ap' name='title' placeholder='Startup name' value={this.state.title} onChange={this.handleInputChange}/>
                    <textarea className='sDesc-ap' name='shortDescription' placeholder='Short description' value={this.state.shortDescription} onChange={this.handleInputChange} />
                    <textarea className='fDesc-ap' name='fullDescription' placeholder='Full description' value={this.state.fullDescription} onChange={this.handleInputChange} />
                    <input type="text" className='input-ap' name='cityCenter' placeholder='City' value={this.state.cityCenter} onChange={this.handleInputChange} />
                    <input type="number" className='input-ap' name='requestedMoney' placeholder='' value={this.state.requestedMoney} onChange={this.handleInputChange} />
                    <p className='error-msg-lp'>Here input for icon startup</p>
                    <input type="submit" value='Submit' />
                </form>
                <button onClick={this.handleAutoFill}>Auto Fill</button>
            </div>
        )
    }
}

export default NewPost;