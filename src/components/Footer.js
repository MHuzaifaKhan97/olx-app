import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="row text-center-footer">

                    <ul className='col-md-2 footer_ul'>
                        <li><h6 className="">Polular Categories</h6></li>
                        <li><Link className="footer_link" to='/'> Cars</Link></li>
                        <li><Link className="footer_link" to='/'> Flats for rent</Link></li>
                        <li><Link className="footer_link" to='/'> Jobs</Link></li>
                        <li><Link className="footer_link" to='/'> Mobile Phones</Link></li>
                    </ul>
                    <ul className='col-md-2 footer_ul'>
                        <li><h6 className="">TRENDING SEARCHES</h6></li>
                        <li><Link className="footer_link" to='/'> Bikes</Link></li>
                        <li><Link className="footer_link" to='/'> watches</Link></li>
                        <li><Link className="footer_link" to='/'> Books</Link></li>
                        <li><Link className="footer_link" to='/'> Dogs</Link></li>
                    </ul>
                    <ul className='col-md-2 footer_ul'>
                        <li><h6 className="">About us</h6></li>
                        <li><Link className="footer_link" to='/'> About OLX Group</Link></li>
                        <li><Link className="footer_link" to='/'> OLX Blog</Link></li>
                        <li><Link className="footer_link" to='/'> Contact Us</Link></li>
                        <li><Link className="footer_link" to='/'> OLX for Businesses</Link></li>
                    </ul>
                    <ul className='col-md-2 footer_ul'>
                        <li><h6 className="">About us</h6></li>
                        <li><Link className="footer_link" to='/'> OLX</Link></li>
                        <li><Link className="footer_link" to='/'> Help</Link></li>
                        <li><Link className="footer_link" to='/'> Sitemap</Link></li>
                        <li><Link className="footer_link" to='/'> Legal &amp; Privacy information</Link></li>
                    </ul>
                    <ul className='col-md-4 footer_ul'>
                        <li><h6 className="">Follow us</h6></li>
                        <li>
                            <Link to='/' className="text-dark mx-2"><span className="fab fa-facebook"></span></Link>
                            <Link to='/' className="text-dark mx-2"><span className="fab fa-twitter"></span></Link>
                            <Link to='/' className="text-dark mx-2"><span className="fab fa-youtube"></span></Link>
                            <Link to='/' className="text-dark mx-2"><span className="fab fa-instagram"></span></Link>
                        </li>
                        <li>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-5 footer_apple_logo"></div>
                                    <div className="mx-1 col-md-5 footer_android_logo"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="footer_bottom">
                <div className="container">
                        <div className="float-left text-white">
                            <span className="font-weight-bold">Other counteries: </span>
                            India - South Africa - Indonesia
                        </div>
                        <div className="float-right text-white">
                            <span className="font-weight-bold">Free Classifieds in Pakistan </span>
                        &copy; 2006-2020 OLX
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
