import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";

class CustomerDelete extends PureComponent {
  deleteCustomer = (id) => {
    const { stateRefresh } = this.props;
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    });
    stateRefresh();
  };

  render() {
    const { id } = this.props;
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => this.deleteCustomer(id)}
      >
        삭제
      </Button>
    );
  }
}

export default CustomerDelete;
