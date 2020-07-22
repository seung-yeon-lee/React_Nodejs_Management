import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePost } from "../actions/PostActions";

class Post extends Component {
  handleClick = () => {
    this.props.deletePost(this.props.post.id);
    this.props.history.push("/route");
  };
  render() {
    const post = this.props.post ? (
      <div>
        <h1>{this.props.post.title}</h1>
        <p>{this.props.post.body}</p>
        <div>
          <button onClick={this.handleClick}>Delete</button>
        </div>
      </div>
    ) : (
      <div>No data</div>
    );
    return <div>{post}</div>;
  }
}

const mapStateToProps = (state, props) => {
  let id = props.match.params.post_id;
  return {
    post: state.posts.find((post) => post.id === id),
  };
};
const mapDispatchToProps = {
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
