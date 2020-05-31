import React, {Component} from "react";
import {Link} from "react-router-dom";

import '../../css/main.css'
import '../../css/startup-page.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: 'https://vignette.wikia.nocookie.net/brofistio/images/1/10/Black_small_square_u25AA_icon_256x256.png/revision/latest?cb=20180729141347&path-prefix=ru'
        }
    }

    render() {
        return (
            <div className='container-sp'>
                <Link to={{
                    pathname: `/startup/${this.props.block.title}`,
                    postData: this.props.block
                }}>
                    <div className='post-sp'>
                        <div className='rectangle-280-sp'>
                            {/*<img src={this.state.image} alt="" />*/}
                        </div>
                        <div className='post-info-sp'>
                            <h2>{this.props.block.title}</h2>
                            <p>{this.props.block.shortDescription}</p>
                            <p>${this.props.block.requestedMoney}</p>
                            <p>{this.props.block.cityCenter}</p>
                            <p>{this.props.block.date}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Post;