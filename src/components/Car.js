import React, { Component } from 'react'
import './Posts.css';
import { withRouter, Link } from 'react-router-dom';
import {db} from '../firebase';

class Car extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            category: '',
        }
    }
    fetchDataByCategory = () => {
        const category = this.props.match.params.category.split('_').join(' ');
        let arr = [];
        db.ref("post").on('value', (data) => {
            for (var key in data.val()) {
                if (data.val()[key].subcategory === category) {
                   console.log(data.val()[key])
                   arr.push(data.val()[key]);
                }
            }
        })
        setTimeout(() => {
        console.log(arr);
        this.setState({
            posts:arr
        })
        }, 2000);
    }
    componentDidMount() {
        this.fetchDataByCategory()
    }

    render() {
        const { posts } = this.state;
        console.log(posts)
        return (
            <div className="container my-5">
                <h2 className="category-heading">{this.state.category}</h2>
                <div className="row">
                    {
                        posts ?
                            posts.map((post, index) => {
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
                            :
                            <div className="col-md-12">
                                <h1 className="text-center my-5 no-ad-found">No Ad Found</h1>
                            </div>
                    }


                </div>
            </div>
        )
    }
}

export default withRouter(Car);