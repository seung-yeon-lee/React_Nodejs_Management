import React, { PureComponent } from "react";
import axios from "axios";

class CustomerAdd extends PureComponent {
  state = {
    file: null,
    name: "",
    current: "",
    account: "",
    state: "",
    fileName: "",
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

  render() {
    const { file, name, current, account, state, fileName } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>상품 등록</h1>
        상품 이미지:
        <input
          type="file"
          name="file"
          file={file}
          value={fileName}
          onChange={this.handleFileChange}
        />
        <br />
        상품명:
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleValueChange}
        />
        <br />
        최소가:
        <input
          type="text"
          name="current"
          value={current}
          onChange={this.handleValueChange}
        />
        <br />
        최대가:
        <input
          type="text"
          name="account"
          value={account}
          onChange={this.handleValueChange}
        />
        <br />
        보관상태:
        <input
          type="text"
          name="state"
          value={state}
          onChange={this.handleValueChange}
        />
        <br />
        <button type="submit">등록</button>
        <br />
      </form>
    );
  }
}

export default CustomerAdd;
