import React, {Component} from "react";
import {Link} from "react-router-dom";

import '../../css/main.css';
import '../../css/startup-page.css';

class SelectedPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.location.postData,
            title: this.props.location.postData.title,
            image: 'https://vignette.wikia.nocookie.net/brofistio/images/1/10/Black_small_square_u25AA_icon_256x256.png/revision/latest?cb=20180729141347&path-prefix=ru'
        }
    }

    // componentDidMount() {
    //     function loading() { console.log('Loading...'); }
    //     setTimeout(loading,1000)
    // }

    render() {
        return (
            <div className='selected-post-sp'>
                <div className='width-70vw'>
                    <div className='post-header-sp'>
                        <div className='left-img-sp'>
                            <img className='rectangle-280' src={this.state.image} alt=""/>
                        </div>
                        <div className='post-header2-sp'>
                            <h2>{this.state.title}</h2>
                            <p>Requested: ${this.state.post.requestedMoney}</p>
                            <p>{this.state.post.date}</p>
                        </div>
                    </div>
                    <hr />
                    <div className='post-header2-sp'>
                        <p>{this.state.post.fullDescription}</p>
                    </div>
                    <div className='contact-sp'>
                        <Link to='/password-reset'>
                            <button>Contact developers</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectedPost;