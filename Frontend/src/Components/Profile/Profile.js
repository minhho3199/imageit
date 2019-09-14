import React, { Component } from 'react';
import Navbar from '../Header/Navbar/Navbar';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Navbar></Navbar>
         );
    }
}
 
export default Profile;