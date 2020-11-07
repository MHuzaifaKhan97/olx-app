import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Post from './components/Post';
import PostItem from './components/PostItem';
import MobilePhone from './components/MobilePhone';
import Car from './components/Car';
import MotorCycle from './components/MotorCycle';
import House from './components/House';
import TvVideoAudio from './components/TvVideoAudio';
import Tablet from './components/Tablet';
import LandPlot from './components/LandPlot';
import Search from './components/Search';
import MyAds from './components/MyAds';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/post-item/:id' component={PostItem} />
            <Route path='/profile' component={Profile} />
            <Route path='/myads' component={MyAds} />
            <Route path='/mobilephone/:category' component={MobilePhone} />
            <Route path='/car/:category' component={Car} />
            <Route path='/motorcycle/:category' component={MotorCycle} />
            <Route path='/house/:category' component={House} />
            <Route path='/tv-video-audio/:category' component={TvVideoAudio} />
            <Route path='/tablet/:category' component={Tablet} />
            <Route path='/land-plot/:category' component={LandPlot} />
            <Route path='/search/:search' component={Search} />
            <Route path='/post' component={Post} />
            <Route path='*' component={() => <h1 className="my-5"> 404 Not Found</h1>} />
          </Switch>
          <Footer />
        </Router>
      </div>
    )
  }
}

export default App;
