import React, { Component } from 'react';
import './Leaderboards.css';
import axios from "axios"

class Leaderboards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }
    componentDidMount() {
        axios.get("/api/users/leaderboards")
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => console.log(err))
    }
    //The leaderboard is a visual realtime counter displayed upon the website. It keeps track of user Posts and ranks them, this is then used in sorting for user popularity.
    render() {
        return (
            <div id="leaderboards-container">
                <div id="leaderboards-header-container">
                    <h4>Leaderboards</h4>
                </div>
                <ol id="list">
                    {this.state.users.map((user, i) => (
                        <li key={user._id} id="user-list">
                            <span>{i + 1}. </span>
                            <div id="user-container">
                                <p><b>{user.name}</b></p>
                                <span>{user.postCount} posts</span>
                            </div>

                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default Leaderboards;