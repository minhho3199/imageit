import React, {Component} from 'react';
import Navbar from "../Header/Navbar/Navbar"
import './LandingPage.css'
class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Navbar />
                <div id="landing-title">
                    <h1>Welcome to ImageIt</h1>
                </div>
            </div>
        );
    }
}

export default LandingPage;