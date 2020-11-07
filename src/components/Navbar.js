import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import './Navbar.css';
import logo from './img/logo.png'
import guitar from './img/guitar.webp';
import heart from './img/hearts.webp';
import person from './img/person.webp';
import { auth, db } from '../firebase';
import firebase from 'firebase';
import Search from './Search';

let width = 0;
function Navbar() {

    const [toggle, setToggle] = useState(true);
    const [signIntoPhone, setSignInToPhone] = useState('');
    const [authUser, setAuthUser] = useState('');
    const [phone, setPhone] = useState('');
    const [loggedInUser, setLoggedInUser] = useState({});
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const toggleRef = useRef()
    const history = useHistory();
    const [search, setSearch] = useState("");

    const addClass = () => {
        toggleRef.current.classList.add('add_animate_chevron')
        toggleRef.current.classList.remove('remove_animate_chevron')
        setToggle(false)
    }
    const removeClass = () => {
        toggleRef.current.classList.add('remove_animate_chevron')
        toggleRef.current.classList.remove('add_animate_chevron')
        setToggle(true)
    }
    const signInWithFacebook = () => {
        let provider = new firebase.auth.FacebookAuthProvider();
        let id = db.ref("users").push().key;
        auth.signInWithPopup(provider)
            .then((response) => {
                db.ref('users').once('value', (data) => {
                    let keys = Object.keys(data.val()).length;
                    let flag = true;
                    let i = 1;
                    for (var key in data.val()) {
                        if (data.val()[key].email.toLowerCase() === response.user.email.toLowerCase()) {
                            flag = false;
                            console.log("Already User Stored");
                            return;
                        }
                        else {
                            if (flag === true && i === keys) {
                                console.log(flag);
                                console.log("User Stored")
                                db.ref(`users/${id}`).set({
                                    id: id,
                                    username: response.user.displayName,
                                    email: response.user.email,
                                    password: '',
                                    about: '',
                                    phone: '',
                                    photoURL: response.user.photoURL,
                                })
                                return;
                            }
                            i++;
                        }
                    }
                })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    const signInWithGoogle = async () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        let id = db.ref("users").push().key;
        auth.signInWithPopup(provider)
            .then((response) => {
                db.ref('users').once('value', (data) => {
                    let keys = Object.keys(data.val()).length;
                    let flag = true;
                    let i = 1;
                    for (var key in data.val()) {
                        if (data.val()[key].email.toLowerCase() === response.user.email.toLowerCase()) {
                            flag = false;
                            console.log("Already User Stored");
                            return;
                        }
                        else {
                            if (flag === true && i === keys) {
                                console.log(flag);
                                console.log("User Stored")
                                db.ref(`users/${id}`).set({
                                    id: id,
                                    username: response.user.displayName,
                                    email: response.user.email,
                                    password: '',
                                    about: '',
                                    phone: '',
                                    photoURL: response.user.photoURL,
                                })
                                return;
                            }
                            i++;
                        }

                    }
                })

            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    const signInWithPhone = () => {
        if (phone.length === 11) {
            console.log(phone)
        }
        else {
            alert("Incorrect Phone Number")
        }
    }
    const onChangeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const signInEmail = () => {
        console.log(user)
        let id = db.ref("users").push().key;
        if (user.username === "" || user.username === " ") {
            alert("Please Enter Username");
        } else if (user.email === "" || user.email === " ") {
            alert("Please Enter Username");
        } else if (user.password === "" || user.password === " ") {
            alert("Please Enter Username");
        } else {
            auth.createUserWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    alert("User Successfully Created")
                    db.ref(`users/${id}`).set({
                        id: id,
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        about: '',
                        phone: '',
                        photoURL: '',
                    })
                })
                .catch((error) => {
                    alert(error.message)
                })
            setUser({
                username: '',
                email: '',
                password: ''
            })
        }

    }
    const onChangeHandlerLogin = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }
    const loginWithEmail = () => {
        console.log(login)
        auth.signInWithEmailAndPassword(login.email, login.password)
            .then((response) => {
                alert("Succesfully Logged In");
                setLogin({
                    email: '',
                    password: ''
                })
            })
            .catch((error) => {
                alert(error.message);
            })
    }
    const addPost = () => {
        history.push('/post')
    }
    const onSearchHandle = () => {
        if (search) {
            setSearch("");
            history.push("/");
            setTimeout(() => {
                history.replace(`/search/${search}`)
            }, 200);
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setAuthUser(user)
            if (user) {
                db.ref('users').once('value', (data) => {
                    for (var key in data.val()) {
                        if (data.val()[key].email.toLowerCase() === user.email.toLowerCase()) {
                            setLoggedInUser(data.val()[key]);
                        }
                    }
                })
            }
        })
        window.addEventListener('resize', () => {
            width = window.innerWidth
            // console.log(width)
        })
    }, [])

    return (
        <>
            <div className="navbar_header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1 logo my-3 d-flex" style={{ justifyContent: 'space-around' }}>
                            <Link to="/"><img src={logo} height="50" alt="Olx Logo" /></Link>
                            <button className="navbar-toggler nav-btn" data-target="#navbar" data-toggle="collapse">
                                <span className="fa fa-bars"> </span>
                            </button>
                        </div>
                        <div className="col-md-3 location my-3">
                            <span className="fa fa-search search_icon"></span>
                            <span className="text">Pakistan</span>
                            <span className="fa fa-chevron-down chevron_icon"></span>
                        </div>
                        <div className="col-md-5 search my-3">
                            <div className="input-group">
                                <input onChange={(e) => setSearch(e.target.value)} type="text" className="form-control" placeholder=" Find Cars, Mobile Phones and more..." />
                                <div className="input-group-append">
                                    <button onClick={() => onSearchHandle()} className="input-group-text search_icon" id="btnGroupAddon">
                                        <span className="fa fa-search"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 login my-3">
                            {
                                authUser ? <div style={{ display: 'inline-block' }}>
                                    <span className="fal fa-comment fa-2x mt-2"></span>
                                    <span className="fal fa-bell fa-2x mx-2 mt-2"></span>
                                    <div className="dropdown" style={{ display: 'inline-block' }}>
                                        <span className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="fal fa-user fa-2x mt-2" ></span>
                                        </span>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <Link className="dropdown-item" to='/profile'>
                                                <div className="container-fluid">
                                                    <div className="row" style={{ width: '280px' }}>
                                                        <div className="col-md-4">
                                                            <img width="70" className="img-circle py-2 rounded-circle" alt="User Profile" src={loggedInUser.photoURL !== "" ? loggedInUser.photoURL : "https://cdn.onlinewebfonts.com/svg/img_568656.png"} />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <p className="lead">Hello,</p>
                                                            <h4 className="font-weight-bold">{loggedInUser ? loggedInUser.username : null}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to="/myads">
                                            <li className="dropdown-item">
                                                <span className="fa fa-ad mr-3">  </span>My Ads
                                            </li>
                                            </Link>
                                            <li className="dropdown-item" onClick={() => auth.signOut()} >
                                                <span className="fa fa-sign-out mr-3"></span> Sign Out
                                            </li>
                                        </div>
                                    </div>
                                </div>
                                    :
                                    <Link type="button" data-toggle="modal" data-target="#loginModal" to="/">Login</Link>
                            }
                            <button onClick={authUser ? addPost : null} className="btn" type="button" data-toggle="modal" data-target={authUser ? "" : `#loginModal`}>
                                <span className="fa fa-plus mx-1"></span>
                                Sell
                            </button>
                        </div>
                    </div>
                </div>

                {/* Login Modal Start */}

                <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {
                                signIntoPhone === '' ?
                                    <>
                                        <div className="modal-header">
                                            <div id="carouselExampleControls" className="carousel slide carousel_img" data-ride="carousel">
                                                <div className="carousel-inner">
                                                    <div className="carousel-item active text-center">
                                                        <img src={guitar} className="d-blocks" alt="..." />
                                                    </div>
                                                    <div className="carousel-item">
                                                        <img src={heart} className="d-block" alt="..." />
                                                    </div>
                                                    <div className="carousel-item">
                                                        <img src={person} className="d-block" alt="..." />
                                                    </div>
                                                </div>
                                                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                                    <span className="fa fa-less-than text-dark" aria-hidden="true"></span>
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                                    <span className="fa fa-greater-than text-dark" aria-hidden="true"></span>
                                                    <span className="sr-only">Next</span>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="modal-body">
                                            <button type="button" className="close mb-3" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            <button onClick={() => setSignInToPhone('phone')} className="btn btn-white btn_login_custom btn-block my-2">
                                                Continue with phone
                                </button>

                                            <button onClick={signInWithFacebook} className="btn btn-white btn_login_custom btn-block my-2">
                                                <span className="fab fa-facebook mx-2"></span>
                                    Continue with facebook
                                </button>

                                            <button onClick={signInWithGoogle} className="btn btn-white btn_login_custom btn-block my-2">
                                                <span className="fab fa-google mx-2"></span>
                                    Continue with google
                                </button>

                                            <button onClick={() => setSignInToPhone('login')} data-toggle="modal" data-target="#emailModal" className="btn btn-white btn_login_custom btn-block my-2">
                                                <span className="fab fa-message mx-2"></span>
                                    Continue with email
                                </button>

                                            <p className="text-center py-3 login_para">
                                                We won't share your personal details with anyone
                               </p>
                                        </div>
                                    </> :
                                    signIntoPhone === 'phone' ?
                                        <div className="modal-body">
                                            <div className="phone_modal">
                                                <div>
                                                    <span onClick={() => setSignInToPhone('')} className="fa fa-arrow-left"></span>
                                                    <button type="button" className="close mb-3" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="text-center">
                                                    <img src={logo} alt="Logo" width="50" className="text-center my-3" />
                                                    <h5>Enter Your Phone</h5>
                                                    <input id="recaptcha-container" value={phone} onChange={(e) => setPhone(e.target.value)} type="number" placeholder="Phone Number (03152222222)" className="form-control my-4" />
                                                </div>
                                                <div className="my-5">
                                                    <button onClick={signInWithPhone} className="btn btn-block btn_next">
                                                        Next
                                                </button>
                                                    <p>We won't reveal your phone number to anyone else nor use it to send you spam</p>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        signIntoPhone === 'email' ?
                                            <div className="modal-body">
                                                <div className="phone_modal">
                                                    <div>
                                                        <span onClick={() => setSignInToPhone('')} className="fa fa-arrow-left"></span>
                                                        <button type="button" className="close mb-3" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="container text-center">
                                                        <img src={logo} alt="Logo" width="50" className="text-center my-3" />
                                                        <div className="form-group">
                                                            <input onChange={(e) => onChangeHandler(e)} value={user.username} name="username" type="text" placeholder="Enter Name" className="form-control" />
                                                        </div>
                                                        <div className="form-group">
                                                            <input onChange={(e) => onChangeHandler(e)} value={user.email} name="email" type="email" placeholder="Enter Email" className="form-control" />
                                                        </div>
                                                        <div className="form-group">
                                                            <input onChange={(e) => onChangeHandler(e)} value={user.password} name="password" type="password" placeholder="Enter Password" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="my-5">
                                                        <button onClick={signInEmail} className="btn btn-block btn_next">
                                                            Sign Up
                                                        </button>
                                                        <hr />
                                                        <h5 className="text-center">Or</h5>
                                                        <hr />
                                                        <button onClick={() => setSignInToPhone('login')} className="btn btn-block btn_next">
                                                            Sign In
                                                        </button>
                                                        <p>We won't reveal your phone number to anyone else nor use it to send you spam</p>
                                                    </div>
                                                </div>
                                            </div> : signIntoPhone === 'login' ?
                                                <div className="modal-body">
                                                    <div className="phone_modal">
                                                        <div>
                                                            <span onClick={() => setSignInToPhone('')} className="fa fa-arrow-left"></span>
                                                            <button type="button" className="close mb-3" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="container text-center">
                                                            <img src={logo} alt="Logo" width="50" className="text-center my-3" />

                                                            <div className="form-group">
                                                                <input onChange={(e) => onChangeHandlerLogin(e)} value={login.email} name="email" type="email" placeholder="Enter Email" className="form-control" />
                                                            </div>
                                                            <div className="form-group">
                                                                <input onChange={(e) => onChangeHandlerLogin(e)} value={login.password} name="password" type="password" placeholder="Enter Password" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="my-5">
                                                            <button onClick={loginWithEmail} className="btn btn-block btn_next">
                                                                Sign In
                                                       </button>
                                                            <hr />
                                                            <h5 className="text-center">Or</h5>
                                                            <hr />
                                                            <button onClick={() => setSignInToPhone('email')} className="btn btn-block btn_next">
                                                                Sign Up
                                                       </button>
                                                            <p>We won't reveal your phone number to anyone else nor use it to send you spam</p>
                                                        </div>
                                                    </div>
                                                </div> : null

                            }
                        </div>

                    </div>
                </div>

                {/* Login Modal End */}

            </div>
            <nav className="navbar navbar-expand-md navbar_custom">

                <div className="container">
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <Link
                                    onFocus={toggle ? addClass : removeClass}
                                    onBlur={removeClass}
                                    className="nav-link text-dark font-weight-bold" to="" id="navbarDropdown"
                                    data-toggle="dropdown">
                                    ALL CATEGORIES
                            <span ref={toggleRef} className={`mx-1 fa fa-chevron-down`} ></span>
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <div className="container-fluid">
                                        <div className="row navbar-dropdown-child">
                                            <div className="col-md-3 col-sm-6 col-xsm-6">
                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Vehicles</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Tractors &amp; Trailers</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Boats</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Rickshaw &amp; Chingchi</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Buses, Vans &amp; Trucks</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Spare Parts</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Cars Accessories</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Cars on Installments</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Cars</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Vehicles</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Mobiles</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Mobile Phones</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Accessories</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Tablets</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Electronics &amp;
                                            Home Appliances</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Washing Machines &amp; Dryers</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Fridges &amp; Freezers</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">AC &amp; Coolers</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Kitchen Appliances</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Generators, UPS &amp; Power
                                            Solutions</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Home Appliances</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Games &amp; Entertainment</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Cameras &amp; Accessories</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Computers &amp; Accessories</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Electronics &amp;
                                            Property for Sale</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Portions &amp; Floors</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Shops - Offices - Commercial
                                            Space</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Apartments &amp; Flats</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Houses</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Land &amp; Plots</Link>






                                            </div>
                                            <div className="col-md-3 col-sm-6 col-xsm-6">
                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Animals</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Animals</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Pet Food &amp; Accessories</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Horses</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Livestock</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Dogs</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Cats</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Hens &amp; Aseel</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Birds</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Fish &amp; Aquariums</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Furniture &amp;
                                                Home Decor
                                        </Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Household Items</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Office Furniture</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Curtains &amp; Blinds</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Rugs &amp; Carpets</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Painting &amp; Mirrors</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Garden &amp; Outdoor</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Tables &amp; Dining</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Home Decoration</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Beds &amp; Wardrobes</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Sofa &amp; Chairs</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Business,
                                            Industrial &amp; Agriculture</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Medical &amp; Pharma</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Business &amp; Industry</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Agriculture</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Construction &amp; Heavy Machinery
                                            </Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Trade &amp; Industrial</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Food &amp; Restaurants</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Business for Sale</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Bikes</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Scooters</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">ATV &amp; Quads</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Bicycles</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Spare Parts</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Motorcycles</Link>

                                            </div>
                                            <div className="col-md-3 col-sm-6 col-xsm-6">
                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Fashion &amp; Beauty</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Fashion</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Couture</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Lawn &amp; Pret</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Wedding</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Watches</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Skin &amp; Hair</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Make Up</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Jewellery</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Footwear</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Clothes</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Accessories</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Property for Rent</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Land &amp; Plots</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Vacation Rentals - Guest Houses</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Roommates &amp; Paying Guests</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Rooms</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Shops - Offices - Commercial Space</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Portions &amp; Floors</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Apartments &amp; Flats</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Houses</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Jobs</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Jobs</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Part - Time</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Domestic Staff</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Medical</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Manufacturing</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Accounting &amp; Finance</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Human Resources</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Clerical &amp; Administration</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Hotels &amp; Tourism</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">IT &amp; Networking</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Sales</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Customer Service</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Education</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Advertising &amp; PR</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Marketing</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Online</Link>

                                            </div>
                                            <div className="col-md-3 col-sm-6 col-xsm-6">
                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Services</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Farm &amp; Fresh Food</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Catering &amp; Restaurant</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Home &amp; Office Repair</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Movers &amp; Packers</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Maids &amp; Domestic Help</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Health &amp; Beauty</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Event Services</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Electronics &amp; Computer Repair</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Services</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Web Development</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Drivers &amp; Taxi</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Car Rental</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Travel &amp; Visa</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Education &amp; Classes</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Books, Sports &amp; Hobbies</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Hobbies</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Gym &amp; Fitness</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Sports Equipment</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Musical Instruments</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Books &amp; Magazines</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Kids</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Kids Accessories</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Kids Bikes</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Swings &amp; Slides</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Prams &amp; Walkers</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Toys</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Kids Furniture</Link>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </li>
                            <li><Link to={`/mobilephone/${"Mobile_Phones"}`} className="nav-link nav-link-text">Mobile Phones</Link></li>
                            <li><Link to={`/car/${"Cars"}`} className="nav-link nav-link-text">Cars</Link></li>
                            <li><Link to={`/motorcycle/${"Motorcycles"}`} className="nav-link nav-link-text">Motorcycles</Link></li>
                            <li><Link to={`/house/${"Houses"}`} className="nav-link nav-link-text">Houses</Link></li>
                            <li><Link to={`/tv-video-audio/${"Tv_Video_Audio"}`} className="nav-link nav-link-text">Tv-Video-Audio</Link></li>
                            <li><Link to={`/tablet/${"Tablets"}`} className="nav-link nav-link-text">Tablets</Link></li>
                            <li><Link to={`/land-plot/${"Land_&_Plots"}`} className="nav-link nav-link-text">Land &amp; Plots</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
