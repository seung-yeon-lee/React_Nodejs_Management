import React, { PureComponent } from "react";
import "./App.css";
import Customer from "./components/Customer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  root: {
    width: "100%",
    marginTop: "10px",
    overflowX: "auto", // x축으로 overflow가 발생 할 수 있도록
  },
  table: {
    minWidth: 1080,
  },
});

class App extends PureComponent {
  state = {
    customers: "",
  };
  componentDidMount() {
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
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>상품명</TableCell>
              <TableCell>최소가</TableCell>
              <TableCell>최대가</TableCell>
              <TableCell>보관상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              ? customers.map((v) => {
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
              : ""}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default withStyles(styles)(App);
