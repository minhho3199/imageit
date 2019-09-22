import React, { Component } from 'react';
import "./CommentList.css"
class CommentList extends Component {
    constructor(props) {
        super(props);
        this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
        this.state = {
            comments: [],
        }
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {
        fetch("http://localhost:5000/api/posts/comment/" + this.props.postID)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    comments: data,
                }, console.log(data))

            })

    }
    render() {
        var base64Flag = 'data:image/jpeg;base64,';
        return (
            <div>
                {this.state.comments.map(comment => (
                    <div key={comment._id}>
                            <div className="posted-by-container">
                                <span>by <em>{comment.createBy.name}</em></span>
                            </div>
                            <div className="pic-container">
                                <img src={base64Flag + this.arrayBufferToBase64(comment.image.data)} className="picture"></img>
                            </div>
                    </div>
                ))}
            </div>

        );
    }
}

export default CommentList;