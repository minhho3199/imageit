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

      //Updates the component after recieving the new sort props from Homepage.js
      componentWillReceiveProps(nextProps) {
            this.setState({
                  sort: nextProps.sort,
                  posts: [],
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
                                          // count: this.state.count + 5
                                    })
                              })
                  } else if (this.state.sort === "Sort by: Popular ") {
                        axios.get(`/api/posts/popular?count=${this.state.count}`)
                              .then(res => {
                                    this.setState({
                                          loading: false,
                                          posts: res.data,
                                          // count: this.state.count + 5
                                    })
                              })
                  }
            })

      }

      //This code is based on the answer by Traversy Media on Youtube
      //See https://www.youtube.com/watch?v=gk_6BKiy6X4
      //This code enables us to on our main page 'scroll' indefinately. This will allow the user to only consume bandwith on what they wish to view instead of forcing pages onto them. It also enables a consistant smooth viewing experiance.
      componentDidMount() {
            if (this.state.sort === "Sort by: New ") {
                  axios.get(`/api/posts/new?count=${this.state.count}`)
                        .then(res => {
                              this.setState({
                                    loading: false,
                                    posts: res.data,
                                    
                              })
                        })
            }
            else if (this.state.sort === "Sort by: Popular ") {
                  axios.get(`/api/posts/popular?count=${this.state.count}`)
                        .then(res => {
                              this.setState({
                                    loading: false,
                                    posts: res.data,
                                    
                              })
                        })
            }
      }
      //This code is based on the answer by Traversy Media on Youtube
      //See https://www.youtube.com/watch?v=gk_6BKiy6X4
      loadMore() {
            this.setState({
                  count: this.state.count + 5,
            })
            if (this.state.sort === "Sort by: New ") {
                  axios.get(`/api/posts/new?count=${this.state.count}`)
                        .then(res => {
                              this.setState({
                                    loading: false,
                                    posts: this.state.posts.concat(res.data)
                              }, () => {
                                    //As data is collected, a spinning loader is shown. This will reverse if there is no data to collect, and thus no spinning loader will appear.
                                    if (res.data.length === 0) {
                                          this.setState({
                                                hasMore: false
                                          })
                                    }
                              })
                        })
            } else if (this.state.sort === "Sort by: Popular ") {
                  axios.get(`/api/posts/popular?count=${this.state.count}`)
                        .then(res => {
                              this.setState({
                                    loading: false,
                                    posts: this.state.posts.concat(res.data)
                              }, () => {
                                    //This code is the same as the one prior.
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
                                    {/*This code passes the 'post' state to the SinglePost component as converts it to a prop.*/}
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
                        {/*IWhen there is no data to collect, a spinner will appear to visually inform of impeding data collection*/}
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