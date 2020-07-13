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
import AppNav from "./components/AppBar";

class Loading extends PureComponent {
  render() {
    const { progress } = this.props;
    return (
      <TableRow>
        <TableCell colSpan="6" align="center">
          <div>데이터를 불러오는중...</div>
          <CircularProgress variant="static" value={progress} />
        </TableCell>
      </TableRow>
    );
  }
}

const styles = (theme) => ({
  root: {
    width: "100%",
    minWidth: 1080,
  },
  papers: {
    marginRight: 10,
    marginLeft: 10,
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexDirection: "column",
      width: "auto",
    },
  },
  menu: {
    margin: "15px 10px",
    display: "flex",
    justifyContent: "center",
  },
  head: {
    backgroundColor: "silver",
    color: theme.palette.common.black,
    fontSize: "1.0rem",
  },
});

class App extends PureComponent {
  state = {
    customers: "",
    progress: 0,
    result: "",
    searchKeyword: "",
    name: "",
  };

  stateRefresh = () => {
    this.setState({
      customers: [],
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
  handleFilterChange = (e) => {
    this.setState({ name: e.target.value });
    console.log(this.state.name);
  };
  componentDidMount() {
    // this.timer();
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
    const filteredComponent = (data) => {
      let result = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return result.map((v) => {
        return (
          <Customer
            key={v.name}
            id={v.id}
            name={v.name}
            current={v.current}
            account={v.account}
            state={v.state}
            image={v.image}
            stateRefresh={this.stateRefresh}
          />
        );
      });
    };
    const { customers } = this.state;
    const { classes } = this.props;
    const CellList = [
      "번호",
      "이미지",
      "상품명",
      "최소가",
      "최대가",
      "보관상태",
      "설정",
    ];
    return (
      <div className={classes.root}>
        <AppNav
          name={this.state.name}
          value={this.state.searchKeyword}
          onChange={this.handleFilterChange}
        />
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>

        <Paper className={classes.papers}>
          <Table>
            <TableHead>
              <TableRow>
                {CellList.map((c) => {
                  return <TableCell className={classes.head}>{c}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {customers ? (
                filteredComponent(customers)
              ) : (
                <Loading progress={this.state.progress} />
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(App);

// express => mysql => font 작업 후
// redux 연결해서 pagination 구현 예정
