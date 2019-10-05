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
        axios.get("http://localhost:8080/api/users/leaderboards")
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => console.log(err))
    }
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