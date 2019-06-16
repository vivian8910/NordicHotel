import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

const HotelDetails = ({ hotelsData, setHotelsData, match }) => {
  const classes = useStyles();

  const hotelName = match.params.hotel.split("-").join(" ");
  const selectedHotel = hotelsData.filter(
    hotel => hotel.name.trim() === hotelName.trim()
  )[0];
  // might be problematic using index 
  // using this coz there is no unqiue identifier for the hotel
  const hotelIndex = hotelsData.indexOf(selectedHotel);

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };

  const toggleFavorite = () => {
    setHotelsData(prevHotels => {
      const hotelsCopy = [...prevHotels];
      hotelsCopy[hotelIndex].isFavorite = !hotelsCopy[hotelIndex].isFavorite;
      return hotelsCopy;
    });
  };

  // add this to avoid wrong hotel name provided 
  if (hotelIndex < 0) {
    return <p>Not Found</p>;
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            Nordic Hotel
          </Avatar>
        }
        action={
          <IconButton aria-label="Add to favorites" onClick={toggleFavorite}>
            <FavoriteIcon
              className={selectedHotel.isFavorite ? classes.button : ""}
            />
          </IconButton>
        }
        title={hotelName}
        subheader={
          selectedHotel.address.city
            ? selectedHotel.address.city
            : selectedHotel.destinationName
        }
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ marginBottom: 10 }}
        >
          Room capaity: {selectedHotel.roomCapacity}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Brand name: {selectedHotel.brandName}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ marginBottom: 10 }}
          >
            Contact details
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {selectedHotel.contactDetails.phoneNmuber
              ? selectedHotel.contactDetails.phoneNmuber
              : selectedHotel.manager.phoneNumber}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {selectedHotel.manager.emailAddress
              ? selectedHotel.manager.emailAddress
              : ""}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: 20
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    fontSize: 11
  },
  button: {
    color: red[400]
  }
}));

HotelDetails.propTypes = {
  hotelsData: PropTypes.array.isRequired,
  setHotelsData: PropTypes.func.isRequired
};

export default HotelDetails;
