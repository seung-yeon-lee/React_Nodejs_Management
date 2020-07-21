import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class RouteTest extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      this.setState({
        data: res.data.slice(0, 10),
      });
    });
  }
  render() {
    const { data } = this.state;
    const result = data.map((v) => {
      return (
        <Card variant="outlined" style={{ minWidth: "250px" }}>
          <CardContent>
            <Link to={"/" + v.id}>
              <Typography color="textSecondary">Num:{v.id}</Typography>
              <Typography variant="h5" component="h2">
                {v.title}
              </Typography>
            </Link>
          </CardContent>
        </Card>
      );
    });
    return (
      <div style={{ margin: "20px 50px", border: "1px solid" }}>{result}</div>
    );
  }
}

export default RouteTest;
