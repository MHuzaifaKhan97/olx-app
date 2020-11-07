import React, { Component } from 'react';
import './Post.css';
import cameraIcon from './img/camera-icon.png';
import { db, storage, auth } from '../firebase';
import { connect } from 'react-redux';
import { addPost } from '../store/action';

let subcategories = {
    Vehicles: ['Tractor & Trailers', 'Boats', 'Other Vehicles', 'Rickshaw & Chingchi', 'Buses, Vans & Trucks', 'Spare Parts', 'Cars Accessories', 'Cars on Installments', 'Cars'],
    Mobile: ["Mobile Phones", "Accessories", "Tablets"],
    Electronics: ['Washing Machines & Dryers', 'Tv Video Audio', 'Fridges & Freezers', 'AC & Coolers', 'Kitchen Appliances', 'Generators, UPS & Power Solutions', 'Other Home Appliances', 'Games & Entertainment', 'Cameras & Accessories', 'TV - Video - Audio', 'Computers & Accessories'],
    Property: ['Portions & Floors', 'Shops - Offices - Commercial Space', 'Apartments & Flats', 'Houses', 'Land & Plots'],
    Animals: ['Other Animals', 'Pet Food & Accessories', 'Horses', 'Livestock', 'Dogs', 'Cats', 'Hens & Aseel', 'Birds', 'Fish & Aquariums'],
    Furniture: ['Other Household Items', 'Office Furniture', 'Curtains & Blinds', 'Rugs & Carpets', 'Painting & Mirrors', 'Garden & Outdoor', 'Tables & Dining', 'Home Decoration', 'Beds & Wardrobes', 'Sofa & Chairs'],
    Business: ['Medical & Pharma', 'Other Business & Industry', 'Agriculture', 'Construction & Heavy Machinery', 'Trade & Industrial', 'Food & Restaurants', 'Business for Sale'],
    Bikes: ['Scooters', 'ATV & Quads', 'Bicycles', 'Spare Parts', 'Motorcycles'],
    Fashion: ['Other Fashion', 'Couture', 'Lawn & Pret', 'Wedding', 'Watches', 'Skin & Hair', 'Make Up', 'Jewellery', 'Footwear', 'Clothes', 'Accessories'],
    Rent: ['Land & Plots', 'Vacation Rentals - Guest Houses', 'Roommates & Paying Guests', 'Rooms', 'Shops - Offices - Commercial Space', 'Portions & Floors', 'Apartments & Flats', 'Houses'],
    Jobs: ['Other Jobs', 'Part - Time', 'Domestic Staff', 'Medical', 'Manufacturing', 'Accounting & Finance', 'Human Resources', 'Clerical & Administration', 'Hotels & Tourism', 'IT & Networking', 'Sales', 'Customer Service', 'Education', 'Advertising & PR', 'Marketing', 'Online'],
    Services: ['Farm & Fresh Food', 'Catering & Restaurant', 'Home & Office Repair', 'Movers & Packers', 'Maids & Domestic Help', 'Health & Beauty', 'Event Services', 'Electronics & Computer Repair', 'Other Services', 'Web Development', 'Drivers & Taxi', 'Car Rental', 'Travel & Visa', 'Education & Classes'],
    Books: ['Other Hobbies', 'Gym & Fitness', 'Sports Equipment', 'Musical Instruments', 'Books & Magazines'],
    Kids: ['Kids Accessories', 'Kids Bikes', 'Swings & Slides', 'Prams & Walkers', 'Toys', 'Kids Furniture']
}
class Post extends Component {

    state = {
        loggedInUser: {},
        postId: '',
        subcat: [],
        selectedCategory: '',
        selectedSubCategory: '',
        imgUrl: '',
        authUser: '',
        ad: {
            category: '',
            subcategory: '',
            make: '',
            condition: '',
            title: '',
            price: '',
            desc: '',
            location: '',
            phone: '',
            imgURL: '',
            id: '',
            submitDate: '',
            submittedBy: '',
            email:''

        }
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            this.setState({ authUser: user })
            if (user) {
                db.ref('users').once('value', (data) => {
                    for (var key in data.val()) {
                        if (data.val()[key].email.toLowerCase() === user.email.toLowerCase()) {
                            this.setState({
                                loggedInUser: data.val()[key]
                            })
                        }
                    }
                })
            }
        })
    }
    makeSubMenu = (e) => {
        // console.log(subcategories[e.target.value])
        this.setState({
            selectedCategory: e.target.value,
            subcat: subcategories[e.target.value]
        })
    }
    onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)

        await fileRef.put(file)
        const imgReference = await fileRef.getDownloadURL();
        this.setState({
            imgUrl: imgReference
        });

        console.log(this.state.imgUrl)
    }
    handleChange = (e) => {
        let id = db.ref("users").push().key;
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let date = new Date();

        let submitDate = `${months[date.getMonth()]}-${date.getDate()}`
        console.log(submitDate)

        this.setState({
            ad: {
                ...this.state.ad,
                [e.target.name]: e.target.value,
                category: this.state.selectedCategory,
                subcategory: this.state.selectedSubCategory,
                imgURL: this.state.imgUrl,
                id: id,
                submitDate: submitDate,
                submittedBy: this.state.loggedInUser.username,
                email:this.state.loggedInUser.email
            },
            postId: id,
        })
    }
    submitPost = async () => {
        const { title, desc, price, location, condition, category, subcategory, phone, make } = this.state.ad;

        if (make === "" || make === " ") {
            alert("Please Enter Making Company")
        } else if (title === "" || title === " ") {
            alert("Please Enter Title")
        } else if (desc === "" || desc === " ") {
            alert("Please Enter Description")
        } else if (location === "" || location === " ") {
            alert("Please Enter Location")
        } else if (category === "" || category === " ") {
            alert("Please Enter Category")
        } else if (subcategory === "" || subcategory === " ") {
            alert("Please Enter Sub-Category")
        } else if (condition === "" || condition === " ") {
            alert("Please Define Condition")
        } else if (price === "" || price === " ") {
            alert("Please Enter Price")
        } else if (phone === "" || phone === " ") {
            alert("Please Enter Phone Number")
        }
        else {
            const ad = this.state.ad;
            const postId = this.state.postId;
            this.props.addpost(ad)
            // console.log(this.props);
            db.ref('post').child(postId).set(ad)
                .then((response) => {
                    alert("Successfully Post Added")
                })
                .catch((error) => {
                    alert(error.message);
                })
        }
    }
    onImgClick = () => {
        document.getElementById("img_upload").click();
    }

    render() {
        const { subcat, authUser } = this.state;
        console.log(this.state.loggedInUser.username)
        return (
            <div className="container py-5">
                {
                    authUser ?
                        <div className="row">
                            <div className="col-md-12 choose_categories">
                                <h3>Post Your Ad</h3>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="category" className="my-3 ad_post_text">Select Category</label>
                                            <select className="form-control" onChange={(e) => this.makeSubMenu(e)}>
                                                <option defaultValue="">Choose Category</option>
                                                <option value="Vehicles" >Vehicles</option>
                                                <option value="Mobile" >Mobile</option>
                                                <option value="Electronics" >Electronics &amp; Home Appliances</option>
                                                <option value="Property" >Property for Sale</option>
                                                <option value="Animals">Animals</option>
                                                <option value="Furniture">Furniture &amp; Home Decor</option>
                                                <option value="Business">Business, Industrial &amp; Agriculture</option>
                                                <option value="Bikes" >Bikes</option>
                                                <option value="Fashion">Fashion &amp; Beauty</option>
                                                <option value="Rent" >Property for Rent</option>
                                                <option value="Jobs">Jobs</option>
                                                <option value="Services">Services</option>
                                                <option value="Books">Books, Sports &amp; Hobbies</option>
                                                <option value="Kids">Kids</option>
                                            </select>
                                            <div className="form-group my-3">
                                                <label htmlFor="make" className="ad_post_text"> Make*
                                        </label>
                                                <input onChange={(e) => this.handleChange(e)} type="text" name="make" className="form-control" />
                                            </div>
                                            <div className="form-group my-3">
                                                <label htmlFor="title" className="ad_post_text"> Ad Title*
                                        </label>
                                                <input onChange={(e) => this.handleChange(e)} type="text" name="title" className="form-control" />
                                            </div>
                                            <div className="form-group my-3">
                                                <label htmlFor="desc" className="ad_post_text"> Description*
                                        </label>
                                                <textarea onChange={(e) => this.handleChange(e)} rows="3" name="desc" className="form-control" />
                                            </div>
                                            <div className="form-group my-3">
                                                <label htmlFor="location" className="ad_post_text"> Confirm Your Location*
                                        </label>
                                                <div className="container-dynamic">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <input onChange={(e) => this.handleChange(e)} placeholder="Enter Area" type="text" name="area" className="form-control" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <input onChange={(e) => this.handleChange(e)} placeholder="Enter Full Location" type="text" name="location" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="subcategory" className="my-3 ad_post_text">Select Subcategory</label>
                                            <select className="form-control" onChange={(e) => this.setState({ selectedSubCategory: e.target.value })}>
                                                <option defaultValue="">Choose Subcategory</option>
                                                {
                                                    subcat.map((subcat, index) => {
                                                        return <option key={index} value={subcat} >
                                                            {subcat}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                            <div className="form-group my-3">
                                                <label htmlFor="condition" className="ad_post_text"> Condition*
                                        </label>
                                                <div className="ad_post_text_radio">
                                                    Used <input onChange={(e) => this.handleChange(e)} type="radio" name="condition" value="used" className="mr-5 mt-3" />
                                            New <input onChange={(e) => this.handleChange(e)} type="radio" name="condition" value="new" />
                                                </div>

                                            </div>
                                            <div className="form-group my-3">
                                                <label htmlFor="price" className="ad_post_text"> Set Price*
                                        </label>
                                                <input onChange={(e) => this.handleChange(e)} type="number" name="price" className="form-control" />
                                            </div>
                                            <div className="image-upload">
                                                <label htmlFor="Image" className="ad_post_text mt-1"> Set Image*
                                        </label> <br />
                                                <label>
                                                    <img onClick={this.onImgClick} src={cameraIcon} alt="camera-icon" className="my-2 camera_icon" width="60" />
                                                </label>
                                                <input id="img_upload" className="form-control" onChange={(e) => this.onFileChange(e)} type="file" />
                                            </div>
                                            <div className="form-group my-3">
                                                <label htmlFor="phone" className="ad_post_text"> Mobile Phone Number*
                                        </label>
                                                <input onChange={(e) => this.handleChange(e)} type="number" name="phone" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row my-3">
                                        <div className="col-md-12">
                                            <button onClick={() => this.submitPost()} className="btn-block btn_addpost">
                                                Add Post
                                    </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div style={{ height: '37vh', display: 'grid', placeItems: 'center' }}>
                            <div className="container text-center">
                                <h1>You are not logged In</h1>
                                <p>Log In to see your profile</p>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts
})
const mapDispatchToProps = (dispatch) => ({
    addpost: (ad) => dispatch(addPost(ad))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);