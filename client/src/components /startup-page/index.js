import React, {Component} from "react";

import Post from "./post";
import '../../css/main.css'
import '../../css/startup-page.css';

class Startup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchRequest: ''
        }
    }

    componentDidMount() {
        console.log("CDM2");
        fetch('http://localhost:3002/get-all-posts')
            .then((res) => res.json())
            .then(data => this.setState({ data: data }))
            .catch(error => console.log(error))
    }

    handleInputChange = (e) => {
        this.setState({
            searchRequest: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3002/search-post', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({request: this.state.searchRequest})
        }).then((res) => res.json())
            .then((message) => alert(message))
    }

    render() {
        return ( // На текущий момент опубликовано столько то стартапов (вместо текущего h1)
            <div className='background-color-sp'>
                <h1 className='h1-sp'>Find. Explore. Invest</h1>
                <div className='search-sp'>
                    <form onSubmit={this.handleSubmit}>
                        <input type="search" className='searchInput-sp' name='searchRequest' placeholder='Startup title' onChange={this.handleInputChange} />
                        <input type="submit" className='searchSubmit-sp' value='Search' />
                    </form>
                </div>
                <hr className='hr-sp' />
                <div>
                    {this.state.data.map(block => <Post block={block} />)}
                </div>
            </div>
        )
    }
}

export default Startup;