import React, { PureComponent } from "react";
import "./App.css";
import Customer from "./components/Customer";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTable = withStyles(() => ({
  table: {
    minWidth: 1080,
  },
}))(Table);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default class App extends PureComponent {
  state = {
    customers: "",
    progress: 0,
  };

  timer = () => {
    setInterval(() => {
      this.setState((state) => ({
        progress: state.progress + 10,
      }));
    }, 200);
  };
  componentDidMount() {
    this.timer();
    this.callApi()
      .then((res) => this.setState({ customers: res }))
      .catch((err) => console.log(err));
  }
  callApi = async () => {
    const res = await fetch("/api/customers");
    const body = await res.json();
    return body;
  };

  render() {
    const { customers } = this.state;
    return (
      <TableContainer style={{ marginTop: "10px" }} component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>번호</StyledTableCell>
              <StyledTableCell>이미지</StyledTableCell>
              <StyledTableCell>상품명</StyledTableCell>
              <StyledTableCell>최소가</StyledTableCell>
              <StyledTableCell>최대가</StyledTableCell>
              <StyledTableCell>보관상태</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? (
              customers.map((v) => {
                return (
                  <Customer
                    key={v.name}
                    id={v.id}
                    name={v.name}
                    current={v.current}
                    account={v.account}
                    state={v.state}
                    image={v.image}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    variant="static"
                    value={this.state.progress}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </TableContainer>
    );
  }
}
