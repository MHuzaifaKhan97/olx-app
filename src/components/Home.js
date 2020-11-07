import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { fetchPost } from '../store/action';
import { Link } from 'react-router-dom';

import heroad from './img/home_add.jpeg';

class Home extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        this.props.fetchpost();
        setTimeout(() => {
            for (var key in this.props.posts[0]) {
                this.setState({
                    posts: [this.props.posts[0][key], ...this.state.posts]
                })
            }
        }, 2000)
    }

    render() {

        const { posts } = this.state;
        return (
            <div className="home_page">
                <div className="hero_banner">
                </div>
                <div className="container my-5">

                    <h3 className="fresh_recommendations">Fresh Recommendations</h3>
                    <div className="row">
                        {
                            posts ? posts.map((post, index) => {
                                return <Link className="col-md-3 my-2 parent-design" to={`/post-item/${post.id}`} key={index} >
                                    <div className="post-item">
                                        <div className="post-item-child1">
                                            <span className="featured">Featured</span>
                                            <img src={post.imgURL} alt="Post Item" className="img-fluid" />
                                            <span className="far fa-heart heart ml-3"></span>
                                        </div>
                                        <div className="post-item-child2">
                                            <h3>Rs {post.price}</h3>
                                            <p>{post.area}</p>
                                            <small className="full-address">{post.location}</small>
                                            <small className="date">{post.submitDate}</small>
                                        </div>
                                    </div>
                                </Link>
                            })
                                : ""
                        }




                    </div>
                </div>

                <div className="hero_ad">
                    <img alt="" />
                </div>

                {/* <div className="hero_end mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 hero_bottom_img"></div>
                            <div className="col-md-4 hero_bottom_center mt-3">
                                <h2>TRY THE OLX APP</h2>
                                <h5>Buy, sell and find just about anything using the app on your mobile.</h5>
                            </div>
                            <div className="col-md-4 hero_bottom_right mt-5">
                                <h5>Get your app today</h5>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-5 apple_logo"></div>
                                        <div className="col-md-5 android_logo"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    posts: state.posts
})
const mapDispatchToProps = (dispatch) => ({
    fetchpost: () => dispatch(fetchPost())
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
