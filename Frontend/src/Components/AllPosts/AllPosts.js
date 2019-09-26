import React, { Component, lazy, Suspense } from 'react';
import "./AllPosts.css";
import SinglePost from '../SinglePost/SinglePost';
import Spinner from 'react-bootstrap/Spinner';

// const PostComponent = lazy(() => import('../SinglePost/SinglePost'));

class Discussion extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  posts: [],
                  loading: true
            }
      }


      componentDidMount() {
            fetch("http://localhost:5000/api/posts/")
                  .then(res => res.json())
                  .then(data => {
                        this.setState({
                              loading: false,
                              posts: data,
                        })

                  })

      }
      render() {
            return (
                  <div id="container">
                        {this.state.loading ?
                              <div className="discussion-container loading-container">
                                    <Spinner animation="border" role="status">
                                          <span className="sr-only">Loading...</span>
                                    </Spinner>
                              </div> :
                              <div>
                                    {this.state.posts.map(post => (
                                          <div className="discussion-container" key={post._id}>
                                                {/*Passes the post state to SinglePost component as props */}
                                                <SinglePost id={post._id}
                                                      title={post.title}
                                                      author={post.author.name}
                                                      authorID={post.author._id}
                                                      image={post.image.data}
                                                      reactions={post.reactions}
                                                      comments={post.comment} />

                                          </div>
                                    ))}
                              </div>}

                  </div>

            );
      }
}

export default Discussion;