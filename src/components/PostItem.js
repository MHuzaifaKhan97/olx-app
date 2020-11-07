import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchById } from '../store/action';
import './PostItem.css';

class PostItem extends Component {


    state = {
        showphone:false
    }

    showNumber = () => {
        this.setState({
            showphone: !this.state.showphone
        })
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchbyId(id);
    }
    render() {
        const { posts } = this.props;
        console.log(posts)
        return (
            <div className="container">
                <div className="row my-5">
                    <div className="col-md-8 main-left">
                        <div className="col-md-12">
                            <div className="post-image">
                                <img src={posts ? posts.imgURL : ""} className="img-fluid" alt="" />
                            </div>
                        </div>
                        <div className="col-md-12 details-condition">
                            <h4 className="details">Details</h4>
                            <div className="condition">
                                <span>Condition</span>
                                <span className="font-weight-bold" >{posts ? posts.condition : ""}</span>
                                <span>Type</span>
                                <span className="font-weight-bold">{posts ? posts.subcategory : ""}</span>
                            </div>
                        </div>
                        <div className="col-md-12 details-condition">
                            <h4 className="description">Description</h4>
                            <p>
                                {posts ? posts.desc : ""}
                            </p>
                        </div>

                    </div>

                    <div className="col-md-4 main-right">
                        <div className="col-md-12 price-and-detail">
                            <div className="price">
                                <h2>Rs {posts ? posts.price : ""}</h2>
                                <div className="icon">
                                    <span className="fa fa-share-alt"></span>
                                    <span className="mx-3 far fa-heart"></span>
                                </div>
                            </div>
                            <h3>{posts ? posts.make : ""}</h3>
                            <div className="address">
                                <small>{posts ? posts.location : ""}</small>
                                <small>{posts ? posts.submitDate : ""}</small>
                            </div>
                        </div>

                        <div className="col-md-12 seller-detail">
                            <h4>Seller Description</h4>
                            <div className="profile">
                                <img width="50" src="https://cdn.onlinewebfonts.com/svg/img_568656.png" alt="" />
                                <h4 className="my-3">{posts ? posts.submittedBy : ""}</h4>
                            </div>
                            <div className="profile-detail">
                                <button className="btn-custom btn-block my-2">Chat with Seller</button>
                                <p className="text-center">
                                    <span className="far fa-phone-alt fa-2x mx-2 mt-3"></span>
                                    <span> {this.state.showphone ? posts ? posts.phone : "":"03-*******"}</span>
                                    <span onClick={this.showNumber} className="mx-2 show-number" >
                                        {this.state.showphone ?"hide number" : "show number"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts[0]
})
const mapDispatchToProps = (dispatch) => ({
    fetchbyId: (id) => dispatch(fetchById(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostItem));