import React, { Component } from 'react'
import './Posts.css';
import { withRouter, Link } from 'react-router-dom';
import { db } from '../firebase';

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            category: '',
            noresultfound:true
        }
    }
    
    fetchDataByCategory = () => {
        const category = this.props.match.params.search;
        console.log(category)
        let arr = [];
        db.ref("post").on('value', (data) => {
            for (var key in data.val()) {
                if (data.val()[key].title.toLowerCase().includes(category.toLowerCase())) {
                    arr.push(data.val()[key]);
                    this.setState({
                        noresultfound:false,
                    })
                }
            }
        })
        setTimeout(() => {
            console.log(arr);
            this.setState({
                posts: arr,
                category:category
            })
        }, 2500);
    }
    componentDidMount() {
        this.fetchDataByCategory()
    }
   
    render() {
        const { posts,noresultfound , category} = this.state;
        // console.log(posts)
        // console.log(noresultfound)
        return (
            <div className="container my-5">
                <h2 className="category-heading text-uppercase my-5">Search: {category ? category : ""}</h2>
                <div className="row">
                    {
                        !noresultfound ? posts.map((post, index) => {
                            return (<Link className="col-md-3 my-2 parent-design" to={`/post-item/${post.id}`} key={index} >
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
                            </Link>)
                        }) :
                             (<div className="col-md-12">
                                <h1 className="text-center my-5 no-ad-found">No Result Found</h1>
                            </div>) 
                    }


                </div>
            </div>
        )
    }
}

export default withRouter(Search);