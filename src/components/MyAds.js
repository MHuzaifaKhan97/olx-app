import React, { Component } from 'react'
import './Posts.css';
import { withRouter, Link } from 'react-router-dom';
import { db, auth } from '../firebase';
import './MyAds.css';

class MyAds extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            category: '',
            authUser: '',
            noresultfound: true,
        }
    }
    componentDidMount() {
        let arr = [];
        let name = "";
        auth.onAuthStateChanged((user) => {
            console.log(user.email)
            db.ref("post").on('value', (data) => {
                for (var key in data.val()) {
                    if (data.val()[key].email.toLowerCase() === user.email.toLowerCase()) {
                    // if (data.val()[key].submittedBy.toLowerCase() === "huzaifa nadir") {
                        arr.push(data.val()[key])
                        this.setState({
                            noresultfound: false,
                        })
                    console.log(data.val()[key])
                    }
                }
            })
        })
        setTimeout(() => {
            this.setState({
                posts: arr
            })
            console.log(this.state.posts)
        }, 2500);

    }

    render() {
        const { posts, noresultfound } = this.state;
        console.log(posts)
        return (
            <div className="container my-5">
                {/* <h2 className="category-heading">{this.state.category}</h2> */}
                {
                    !noresultfound ? posts.map((post, index) => {
                        return <Link className="row my-3 ad-parent" to={`/post-item/${post.id}`} key={index}>
                            <div className="ad-main">
                                <div className="ad-right">
                                    <span className="first-child">FROM:</span>
                                    <span className="second-child"> {post.submitDate}</span>
                                </div>
                                <div className="ad-left">
                                    <img src={post.imgURL} width="90" />
                                    <h5>
                                        {post.title}
                                    </h5>
                                    <h5>
                                        Rs {post.price}
                                    </h5>
                                    <h6>
                                        {post.location}
                                    </h6>
                                </div>
                                <div className="btn-div">
                                <button className="btn-custom">Edit</button>
                                </div>
                            </div>
                        </Link>
                    })
                        : <div style={{ height: '37vh', display: 'grid', placeItems: 'center' }}>
                            <div className="container text-center">
                                <h1>You are not posted any ad yet.</h1>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default withRouter(MyAds);