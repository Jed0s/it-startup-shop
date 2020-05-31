import React, {Component} from "react";
import Post from "./Post";

import '../../css/home-page.css'

class LastPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3002/get-last-3-posts')
            .then((res) => res.json())
            .then(data => this.setState({ data: data }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className='container-hp'>
                {this.state.data.map(block => <Post block={block} />)}
            </div>
        )
    }
}

export default LastPost;