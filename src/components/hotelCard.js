import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const HotelCard = ({ brandName, hotelName }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {brandName}
        </Typography>
        <Typography>{hotelName}</Typography>
      </CardContent>
      <CardActions className={classes.button}>
        <Link
          to={{ pathname: `/hoteldetails/${hotelName.split(" ").join("-")}` }}
          style={{ textDecoration: "none" }}
        >
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    height: 220,
    position: "relative"
  },
  title: {
    fontSize: 14,
    marginBottom: 48
  },
  pos: {
    marginBottom: 12
  },
  button: {
    position: "absolute",
    bottom: 10,
    left: 10
  },
  name: {
    fontSize: 21
  }
});

HotelCard.propTypes = {
  brandName: PropTypes.string.isRequired,
  hotelName: PropTypes.string.isRequired
};

export default HotelCard;
