import React, { Component } from "react";
import axios from "axios";
class Post extends Component {
  state = {
    post: null,
  };
  componentDidMount() {
    this.callApi();
  }
  callApi = async () => {
    let id = this.props.match.params.post_id;
    let res = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/" + id
    );
    return this.setState({ post: res.data });
  };
  render() {
    const post = this.state.post ? (
      <div>
        <h1>{this.state.post.title}</h1>
        <p>{this.state.post.body}</p>
      </div>
    ) : (
      <div>Loading</div>
    );
    return <div>{post}</div>;
  }
}

export default Post;
