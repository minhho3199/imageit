import React, { Component } from 'react';
import "./AllPosts.css";
import SinglePost from '../SinglePost/SinglePost';
import Spinner from 'react-bootstrap/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

class AllPosts extends Component {
      constructor(props) {
            super(props);
            this.loadMore = this.loadMore.bind(this);
            this.state = {
                  posts: [],
                  loading: true,
                  count: 0,
                  hasMore: true,
                  sort: this.props.sort
            }
      }
      componentWillReceiveProps(nextProps) {
            this.setState({
                  sort: nextProps.sort,
                  count: 0,
                  hasMore: true
            }, () => {
                  if (this.state.sort === "Sort by: New ") {
                        axios.get(`http://localhost:5000/api/posts/new?count=${this.state.count}`)
                              .then(res => {
                                    this.setState({
                                          loading: false,
                                          posts: res.data,
                                          count: this.state.count + 5
                                    })
                              })
                  } else if (this.state.sort === "Sort by: Popular ") {
                        axios.get(`http://localhost:5000/api/posts/popular?count=${this.state.count}`)
                              .then(res => {
                                    this.setState({
                                          loading: false,
                                          posts: res.data,
                                          count: this.state.count + 5
                                    })
                              })
                  }
            })

      }
      //This code is based on the answer by Traversy Media on Youtube
      //See https://www.youtube.com/watch?v=gk_6BKiy6X4
      componentDidMount() {
            console.log(this.state.sort === "Sort by: New ")
            if (this.state.sort === "Sort by: New ") {
                  axios.get(`http://localhost:5000/api/posts/new?count=${this.state.count}`)
                        .then(res => {
                              this.setState({
                                    loading: false,
                                    posts: res.data,
                                    count: this.state.count + 5
                              })
                        })
            } 
            else if (this.state.sort === "Sort by: Popular ") {
                  axios.get(`http://localhost:5000/api/posts/popular?count=${this.state.count}`)
                        .then(res => {
                              this.setState({
                                    loading: false,
                                    posts: res.data,
                                    count: this.state.count + 5
                              })
                        })
            } 
      }
      //This code is based on the answer by Traversy Media on Youtube
      //See https://www.youtube.com/watch?v=gk_6BKiy6X4
      loadMore() {
            const {count} = this.state
            this.setState({
                  count: this.state.count + 5,
            })
            if (this.state.sort === "Sort by: New ") {
                  axios.get(`http://localhost:5000/api/posts/new?count=${count}`)
                        .then(res => {
                              this.setState({
                                    loading: false,
                                    posts: this.state.posts.concat(res.data)
                              }, () => {
                                    //If there is no more data to be fetched, the loading spinner will not be shown
                                    if (res.data.length === 0) {
                                          this.setState({
                                                hasMore: false
                                          })
                                    }
                              })
                        })
            } else if (this.state.sort === "Sort by: Popular ") {
                  axios.get(`http://localhost:5000/api/posts/popular?count=${count}`)
                        .then(res => {
                              this.setState({
                                    loading: false,
                                    posts: this.state.posts.concat(res.data)
                              }, () => {
                                    //If there is no more data to be fetched, the loading spinner will not be shown
                                    if (res.data.length === 0) {
                                          this.setState({
                                                hasMore: false
                                          })
                                    }
                              })
                        })
            }

      }
      render() {
            const posts =
                  <div>
                        {
                              this.state.posts.map(post => (
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
                              ))
                        }
                  </div>
            return (
                  <div id="container">
                        {/*If the data hasn't been fetched yet, a spinner will appear as placeholder */}
                        {this.state.loading ?
                              <div className="discussion-container loading-container">
                                    <Spinner animation="border" role="status">
                                          <span className="sr-only">Loading...</span>
                                    </Spinner>
                              </div> :
                              //This code is based on the answer by Traversy Media on Youtube
                              //See https://www.youtube.com/watch?v=gk_6BKiy6X4
                              <InfiniteScroll
                                    dataLength={this.state.posts.length}
                                    next={this.loadMore}
                                    hasMore={this.state.hasMore}
                                    endMessage="You have reached the end"
                                    loader={
                                          <div className="discussion-container loading-container">
                                                <Spinner animation="border" role="status">
                                                      <span className="sr-only">Loading...</span>
                                                </Spinner>
                                          </div>
                                    }>
                                    {posts}
                              </InfiniteScroll>}

                  </div>

            );
      }
}

export default AllPosts;