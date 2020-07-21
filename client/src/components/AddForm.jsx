import React, { PureComponent } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "400px",
  },
});

class AddForm extends PureComponent {
  state = { content: "" };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.createTodo(this.state);
    this.setState({ content: "" });
  };
  onChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form onSubmit={this.onSubmit}>
          <TextField
            margin="normal"
            label="Create Todos"
            placeholder="할일을 추가하세요"
            className={classes.textField}
            onChange={this.onChange}
            value={this.state.content}
          />
        </form>
        <Button
          style={{ borderRadius: "45px" }}
          onClick={this.onSubmit}
          color="default"
          variant="contained"
          type="submit"
        >
          등록
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(AddForm);
