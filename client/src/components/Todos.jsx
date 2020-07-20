import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";

const styles = (theme) => ({
  item: {
    display: "flex",
    // backgroundColor: "skyblue",
    marginBottom: 7,
    borderBottom: "1px outset",
    justifyContent: "center",
  },
});

class Todos extends Component {
  render() {
    const { classes, todos } = this.props;
    const todoList = todos.length ? (
      todos.map((todo) => {
        return (
          <div className={classes.item} key={todo.id}>
            <span onClick={() => this.props.deleteTodo(todo.id)}>
              {todo.languages}
            </span>
          </div>
        );
      })
    ) : (
      <p className={classes.item}> Check the Data </p>
    );
    return <>{todoList}</>;
  }
}

export default withStyles(styles)(Todos);
