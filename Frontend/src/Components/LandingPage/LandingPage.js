import React, {Component} from 'react';
import Logo from '../Header/Logo/Logo';
import './LandingPage.css'
class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Logo />
                <div id="landing-title">
                    <h1>Welcome to ImageIt</h1>
                </div>
            </div>
        );
    }
}

export default LandingPage;