import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Todos from "./Todos";

const styles = (theme) => ({
  root: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    color: "blue",
    padding: 10,
  },
});

class AddExample extends Component {
  state = {
    todos: [
      { id: 1, languages: "JavaScript" },
      { id: 2, languages: "NodeJS" },
      { id: 3, languages: "JAVA" },
    ],
  };

  deleteTodo = (id) => {
    const todos = this.state.todos.filter((v) => {
      return v.id !== id;
    });
    this.setState({ todos: todos });
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <h1 className={classes.title}>Todo's</h1>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
      </Paper>
    );
  }
}
export default withStyles(styles)(AddExample);
