import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

class CustomerDelete extends PureComponent {
  state = { open: false };
  deleteCustomer = (id) => {
    const { stateRefresh } = this.props;
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    });
    stateRefresh();
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { id, name } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Button variant="contained" color="default" onClick={this.handleOpen}>
          삭제
        </Button>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>선택한 상품의 정보는</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              {id} 번째 상품인
              {name} 입니다. <br />
              <br />
              정말 삭제하시겠습니까?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.deleteCustomer(id)}
              variant="contained"
              color="primary"
            >
              삭제
            </Button>
            <Button onClick={this.handleClose} color="default">
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomerDelete;
