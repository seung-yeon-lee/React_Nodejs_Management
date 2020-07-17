import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
});

class CustomerUpdate extends PureComponent {
  state = {
    open: false,
    file: null,
    name: "",
    current: "",
    account: "",
    state: "",
    fileName: "",
    result: false,
  };
  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    });
  };

  handleSubmit = (id) => (e) => {
    e.preventDefault();
    this.updateCustomer(id).then((res) => console.log(res));
    this.props.stateRefresh();
    this.setState({
      file: null,
      name: "",
      current: "",
      account: "",
      state: "",
      fileName: "",
      open: false,
    });
  };

  updateCustomer = (id) => {
    const url = "/api/customers/" + id;
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("name", this.state.name);
    formData.append("current", this.state.current);
    formData.append("account", this.state.account);
    formData.append("state", this.state.state);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { open, file, name, current, account, state, fileName } = this.state;
    const { id, classes } = this.props;
    return (
      <div style={{ marginTop: "10px" }}>
        <Button variant="contained" color="primary" onClick={this.handleOpen}>
          수정
        </Button>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle style={{ textAlign: "center", color: "gray" }}>
            {id}번 상품 수정
          </DialogTitle>
          <DialogContent>
            <input
              className={classes.hidden}
              accept="image/*"
              id="raised-button-file"
              type="file"
              value={fileName}
              onChange={this.handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                color="primary"
                name="file"
                component="span"
              >
                {fileName === "" ? "상품 이미지 재 선택하기" : fileName}
              </Button>
            </label>
            <br />
            <TextField
              label="상품명"
              type="text"
              name="name"
              value={name}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="최소가"
              type="text"
              name="current"
              value={current}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="최대가"
              type="text"
              name="account"
              value={account}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="품질여부"
              type="text"
              name="state"
              value={state}
              onChange={this.handleValueChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit(id)}
            >
              수정
            </Button>
            <Button onClick={this.handleClose} variant="outlined">
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CustomerUpdate);
