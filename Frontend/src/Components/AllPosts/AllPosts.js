import React, { Component } from 'react';
import "./AllPosts.css";
import SinglePost from '../SinglePost/SinglePost';

class Discussion extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  posts: [],
            }
      }


      componentDidMount() {
            fetch("http://localhost:5000/api/posts/")
                  .then(res => res.json())
                  .then(data => {
                        this.setState({
                              posts: data,
                        })

                  })

      }
      render() {
            return (
                  <div id="container">
                        {this.state.posts.map(post => (
                              <div className="discussion-container" key={post._id}>
                                    {/*Passes the post state to SinglePost component as props */}
                                    <SinglePost id={post._id}
                                          title={post.title}
                                          author={post.author.name}
                                          authorID={post.author._id}
                                          image={post.image.data}
                                          reactions={post.reactions} 
                                          comments={post.comment}/>
                              </div>
                        ))}
                  </div>

            );
      }
}

export default Discussion;