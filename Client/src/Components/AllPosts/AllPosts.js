import React, { Component } from 'react';
import "./AllPosts.css";
import SinglePost from '../SinglePost/SinglePost';
import SpinnerComp from '../Spinner/Spinner'
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
                  sort: this.props.sort,
            }
      }

      //Update the component after receiving a new sort props from Homepage.js
      componentWillReceiveProps(nextProps) {
            this.setState({
                  sort: nextProps.sort,
                  count: 0,
                  hasMore: true,
                  loading: true,
            }, () => {
                  if (this.state.sort === "Sort by: New ") {
                        axios.get(`/api/posts/new?count=${this.state.count}`)
                              .then(res => {
                                    this.setState({
                                          loading: false,
                                          posts: res.data,
                                          count: this.state.count + 5
                                    })
                              })
                  } else if (this.state.sort === "Sort by: Popular ") {
                        axios.get(`/api/posts/popular?count=${this.state.count}`)
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
            if (this.state.sort === "Sort by: New ") {
                  axios.get(`/api/posts/new?count=${this.state.count}`)
                        .then(res => {
                              this.setState({
                                    loading: false,
                                    posts: res.data,
                                    count: this.state.count + 5
                              })
                        })
            }
            else if (this.state.sort === "Sort by: Popular ") {
                  axios.get(`/api/posts/popular?count=${this.state.count}`)
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
            const { count } = this.state
            this.setState({
                  count: this.state.count + 5,
            })
            if (this.state.sort === "Sort by: New ") {
                  axios.get(`/api/posts/new?count=${count}`)
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
                  axios.get(`/api/posts/popular?count=${count}`)
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
                  </div>
            return (
                  <div id="container">
                        {/*If the data hasn't been fetched yet, a spinner will appear as placeholder */}
                        {this.state.loading ?
                              <SpinnerComp /> :
                              //This code is based on the answer by Traversy Media on Youtube
                              //See https://www.youtube.com/watch?v=gk_6BKiy6X4
                              <InfiniteScroll
                                    dataLength={this.state.posts.length}
                                    next={this.loadMore}
                                    hasMore={this.state.hasMore}
                                    loader={<SpinnerComp />}>
                                    {posts}
                              </InfiniteScroll>
                        }
                  </div>
            );
      }
}

export default AllPosts;