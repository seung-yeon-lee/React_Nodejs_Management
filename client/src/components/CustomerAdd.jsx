import React, { PureComponent } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
});

class CustomerAdd extends PureComponent {
  state = {
    file: null,
    name: "",
    current: "",
    account: "",
    state: "",
    fileName: "",
    open: false,
    result: false,
  };
  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    });
  };
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.addCustomer().then((res) => {
      //server로 부터 고객을 추가한 이후
      console.log(res.data);
      this.props.stateRefresh();
    });
    this.setState({
      file: null,
      name: "",
      current: "",
      account: "",
      state: "",
      fileName: "",
      result: true,
      open: false,
    });
  };

  addCustomer = () => {
    const url = "/api/customers";
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
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
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

  render() {
    const { classes } = this.props;
    const { file, name, current, account, state, fileName } = this.state;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleOpen}>
          상품 등록하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle style={{ textAlign: "center", color: "skyblue" }}>
            상품 등록
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
              <Button variant="contained" name="file" component="span">
                {fileName === "" ? "상품 이미지 선택하기" : fileName}
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
              onClick={this.handleSubmit}
            >
              추가
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

export default withStyles(styles)(CustomerAdd);
