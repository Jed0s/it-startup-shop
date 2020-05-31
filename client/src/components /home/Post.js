import React, {Component} from "react";
import {Link} from "react-router-dom";

import '../../css/main.css'
import '../../css/home-page.css'

class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to={{
                    pathname: `/startup/${this.props.block.title}`,
                    postData: this.props.block
                }}>
                    <div className='post-container-hp'>
                        <div className='rectangle-280'>
                            {/*<img src={this.state.image} alt="" />*/}
                        </div>
                        <div className='post-info-hp'>
                            <h2>{this.props.block.title}</h2>
                            <hr/>
                            <p>{this.props.block.shortDescription}</p>
                            <hr/>
                            <p>${this.props.block.requestedMoney}</p>
                            <hr/>
                            <p>{this.props.block.cityCenter}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Post;