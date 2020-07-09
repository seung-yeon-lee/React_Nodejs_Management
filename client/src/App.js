import React, { PureComponent } from "react";
import "./App.css";
import Customer from "./components/Customer";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CustomerAdd from "./components/CustomerAdd";

class Loading extends PureComponent {
  render() {
    const { progress } = this.props;
    return (
      <TableRow>
        <TableCell colSpan="6" align="center">
          <CircularProgress variant="static" value={progress} />
        </TableCell>
      </TableRow>
    );
  }
}

const styles = (theme) => ({
  table: {
    minWidth: 700,
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
});

class App extends PureComponent {
  state = {
    customers: "",
    progress: 0,
  };

  stateRefresh = () => {
    this.setState({
      customers: "",
      progress: 0,
    });
    this.callApi()
      .then((res) => this.setState({ customers: res }))
      .catch((err) => console.log(err));
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
    const { classes } = this.props;
    return (
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>번호</TableCell>
                <TableCell className={classes.head}>이미지</TableCell>
                <TableCell className={classes.head}>상품명</TableCell>
                <TableCell className={classes.head}>최소가</TableCell>
                <TableCell className={classes.head}>최대가</TableCell>
                <TableCell className={classes.head}>보관상태</TableCell>
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
                <Loading progress={this.state.progress} />
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <CustomerAdd stateRefresh={this.stateRefresh} />
      </div>
    );
  }
}
export default withStyles(styles)(App);

// express => mysql => font 작업 후
// redux 연결해서 pagination 구현 예정
