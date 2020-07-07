import React, { PureComponent } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TableRow } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles(() => ({
  // head tag와 body 태그의 내용에 따라 color 변경 부분
  body: {
    fontSize: 14,
  },
}))(TableCell);

class Customer extends PureComponent {
  render() {
    const { name, current, account, state, id, image } = this.props;
    return (
      <StyledTableRow>
        <StyledTableCell>{id}</StyledTableCell>
        <StyledTableCell>
          <img src={image} alt="profile" />
        </StyledTableCell>
        <StyledTableCell>{name}</StyledTableCell>
        <StyledTableCell>{current}</StyledTableCell>
        <StyledTableCell>{account}</StyledTableCell>
        <StyledTableCell>{state}</StyledTableCell>
      </StyledTableRow>
    );
  }
}

export default Customer;
