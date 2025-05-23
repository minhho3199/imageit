import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
class SpinnerComp extends Component {

    //A simple spinner, this is used to inform the user when data is still being loaded to the website to display
    render() {
        return (
            <div className="discussion-container loading-container">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }
}

export default SpinnerComp;