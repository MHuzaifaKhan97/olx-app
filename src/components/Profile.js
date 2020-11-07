import React, { Component } from 'react'
import { auth, db } from '../firebase';
import './Profile.css';

class Profile extends Component {

    state = {
        loggedInUser: {},
        authUser: {},
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
    onChangeHandler = (e) => {
        this.setState({
            ...this.state.loggedInUser,
            loggedInUser:{
                ...this.state.loggedInUser,
                [e.target.name]:e.target.value
            }
        })
    }
    saveChanges = () => {
        const { id, username, email, phone, photoURL, about , password} = this.state.loggedInUser;
        db.ref('users').child(id).set({
            id:id,
            username:username,
            email:email,
            about:about,
            photoURL:photoURL,
            phone:phone,
            password: password,
        })
        .then((response) => {
            alert("Succesfully User Updated.")
        })
        .catch((error) => {
            alert(error.message);
        })
        console.log(this.state.loggedInUser)
    }
    render() {
        const { username, email, phone, about } = this.state.loggedInUser;
        return (
            this.state.authUser ?
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 profile_left my-5">
                            <h6 className="edit_profile">Edit Profile</h6>
                            <h6 className="profile_picture">Profile Picture</h6>
                            <button className="btn btn-block btn_custom_profile">
                                View Profile
                    </button>
                        </div>
                        <div className="col-md-9 my-5 profile_right">
                            <h4>Edit Profile</h4>
                            <div className="container py-3 basic_information">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="mt-3">Basic Information</h6>
                                        <div className="form-group">
                                            <input onChange={(e) => this.onChangeHandler(e)} value={username} name="username" type="text" className="form-control" />
                                            <small className="float-right">13/40</small>
                                        </div>
                                        <div className="form-group">
                                            <textarea onChange={(e) => this.onChangeHandler(e)} value={about} name="about" rows="4" placeholder="About me (Optional)" type="text" className="form-control" />
                                            <small className="float-right">0/200</small>
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                        <div className="why_important mt-5">
                                            <h6><span className="fa fa-lightbulb mx-2"></span> Why is it important?</h6>
                                            <small>
                                                OLX is built on trust. Help other people get to know you. Tell them about the
                                                things you like. Share your favorite brands, books, movies, shows, music, food.
                                                And you will see the results…
                                   </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container py-3 contact_information">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="mt-3">Contact Information</h6>
                                        <div className="form-group">
                                            <input onChange={(e) => this.onChangeHandler(e)} value={phone} name="phone" type="number" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <input onChange={(e) => this.onChangeHandler(e)} value={email} type="email" name="email" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mt-5">
                                            <small className="detail">
                                                This is the number for buyers contacts, reminders, and other notifications.
                                    </small>
                                        </div>
                                        <div className="mt-4">
                                            <small className="detail">
                                                We won't reveal your email to anyone else nor use it to send you spam
                                    </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container py-3 optional_information">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="mt-3">Optional Information</h6>
                                        <small className="font-weight-bold">Facebook</small> <br />
                                        <small className="detail">
                                            Sign in with Facebook and discover your trusted connections to buyers
                                </small> <br />
                                        <small className="font-weight-bold">Google</small> <br />
                                        <small className="detail">
                                            Connect your OLX account to your Google account for simplicity and ease.
                                </small>
                                    </div>
                                    <div className="col-md-6 mt-5">
                                        <div className="form-group">
                                            <button className="btn btn_custom_facebook">Connect Facebook</button>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn_custom_google">Connect Google</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container py-3 save_changes">
                                <span >Discard</span>
                                <button onClick={() => this.saveChanges()} className="btn btn_savechanges">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                : <div style={{height:'37vh',display:'grid',placeItems:'center'}}>
                    <div className="container text-center">
                        <h1>You are not logged In</h1>
                        <p>Log In to see your profile</p>
                    </div>
                </div>
        )
    }
}

export default Profile;