import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { CardHeader } from "@material-ui/core";

const HotelCard = ({ brandName, hotelName, handleClick, favHotels }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label="Add to favorites" onClick={handleClick}>
            <FavoriteIcon
              className={favHotels?.some(hotel => hotel.name === hotelName) ? classes.favButton : ""}
            />
          </IconButton>
        }
        className={classes.root}
      />
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
    marginBottom: 30
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
  },
  favButton: {
    color: red[400]
  },
  root: {
    padding: 4
  }
});

HotelCard.propTypes = {
  brandName: PropTypes.string.isRequired,
  hotelName: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  favHotels: PropTypes.array.isRequired
};

export default HotelCard;
