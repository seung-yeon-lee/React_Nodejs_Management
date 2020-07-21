import React, { PureComponent } from "react";
import "./App.css";
import { withStyles } from "@material-ui/core/styles";
import CustomerAdd from "./components/CustomerAdd";
import AppNav from "./components/AppBar";
import axios from "axios";
import AddExample from "./components/AddExample";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CustomerTable from "./components/CustomerTable";
import RouteTest from "./components/hocTest";
import Post from "./components/Post";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  papers: {
    marginRight: 10,
    marginLeft: 10,
    width: 500,
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexDirection: "column",
      width: "auto",
    },
  },
  menu: {
    display: "flex",
    margin: "15px 10px",
    [theme.breakpoints.up("sm")]: {
      margin: "15px 10px",
      display: "flex",
      justifyContent: "center",
    },
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
    name: "",
  };

  stateRefresh = () => {
    this.setState({
      customers: "",
      progress: 0,
      name: "",
    });

    this.callApi()
      .then((res) => this.setState({ customers: res.data }))
      .catch((err) => console.log(err));
  };

  timer = () => {
    setInterval(() => {
      this.setState((state) => ({
        progress: state.progress + 10,
      }));
    }, 200);
  };

  handleFilterChange = (data) => {
    this.setState({ name: data });
  };
  componentDidMount() {
    this.timer();
    this.callApi()
      .then((res) => this.setState({ customers: res.data }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const res = await axios.get("/api/customers");
    return res;
  };

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <AppNav>
            name={this.state.name}
            value={this.state.searchKeyword}
            handleFilterChange={this.handleFilterChange}
          </AppNav>

          <div className={classes.menu}>
            <CustomerAdd stateRefresh={this.stateRefresh} />
          </div>
        </div>
        <Switch>
          <Route path="/" exact render={() => <CustomerTable />} />
          <Route path="/todo" component={AddExample} />
        </Switch>
        <Switch>
          <Route path="/route" component={RouteTest} />
          <Route path="/:post_id" component={Post} />
        </Switch>
      </Router>
    );
  }
}
export default withStyles(styles)(App);

// express => mysql => font 작업 후
// redux 연결해서 pagination 구현 예정
