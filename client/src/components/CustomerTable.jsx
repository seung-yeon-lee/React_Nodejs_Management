import React, { PureComponent } from "react";
import Customer from "./Customer";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";

const styles = (theme) => ({
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
  head: {
    backgroundColor: "silver",
    color: theme.palette.common.black,
    fontSize: "1.0rem",
  },
});

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

class CustomerTable extends PureComponent {
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
    const filteredComponent = (data) => {
      let result = data.filter((c) => {
        return c.name.indexOf(this.state.name) > -1;
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
      <div>
        <Paper className={classes.papers}>
          <Table>
            <TableHead>
              <TableRow>
                {CellList.map((c) => {
                  return (
                    <TableCell key={c} className={classes.head}>
                      {c}
                    </TableCell>
                  );
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

export default withStyles(styles)(CustomerTable);
