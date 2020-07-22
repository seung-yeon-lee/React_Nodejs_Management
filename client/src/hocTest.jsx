import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const StyledCard = withStyles(() => ({
  card: {
    marginBottom: "5px",
    "&:hover": {
      backgroundColor: "silver",
    },
  },
}))(CardContent);

class RouteTest extends Component {
  render() {
    const { data } = this.props;
    const result = data.map((v) => {
      return (
        <Card
          variant="outlined"
          style={{
            minWidth: "250px",
            border: "1px solid",
            marginBottom: "5px",
          }}
        >
          <StyledCard>
            <Link to={"/" + v.id} style={{ textDecoration: "none" }}>
              <Typography color="textSecondary">Num:{v.id}번</Typography>
              <Typography color="secondary" variant="h5" component="h2">
                Title : {v.title}
              </Typography>
              <Typography variant="h6" component="h2">
                Body: {v.body}
              </Typography>
            </Link>
          </StyledCard>
        </Card>
      );
    });
    return <div style={{ width: "500px", margin: "0 auto" }}>{result}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.posts,
  };
};

export default connect(mapStateToProps)(RouteTest);
