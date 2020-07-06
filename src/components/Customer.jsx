import React, { PureComponent } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class Customer extends PureComponent {
  render() {
    const { name, current, account, state, id, image } = this.props;
    return (
      <TableRow>
        <TableCell>{id}</TableCell>
        <TableCell>
          <img src={image} alt="profile" />
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{current}</TableCell>
        <TableCell>{account}</TableCell>
        <TableCell>{state}</TableCell>
      </TableRow>
    );
  }
}

export default Customer;
