import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import HotelCard from "./hotelCard.js";

const HotelContainer = ({ hotelsData, match, history }) => {
  const classes = useStyles();

  // process data according to different routes
  const extractHotelsForDisplay = () => {
    if (history.location.pathname === "/") {
      return hotelsData;
    }
    if (history.location.pathname === "/favoritelist") {
      return hotelsData.filter(hotel => hotel.isFavorite === true);
    }
    if (history.location.pathname.includes("/location")) {
      return filterHotelsByCity(match.params.city);
    }
    if (history.location.pathname.includes("/hotels")) {
      return searchHotelByName(match.params.name.split("-").join(" "));
    }
  };

  const filterHotelsByCity = city => {
    if (city === "All") {
      return hotelsData;
    } else {
      return hotelsData.filter(hotel => hotel.address.city === city);
    }
  };

  const searchHotelByName = name => {
    return hotelsData.filter(hotel => hotel.name.trim() === name.trim());
  };

  const hotelsForDisplay = extractHotelsForDisplay();

  if (history.location.pathname === "/favoritelist") {
    if (hotelsForDisplay.length === 0) {
      return <p>No favorite hotels yet</p>;
    }
  }

  // catch bad routes
  if (!hotelsForDisplay || hotelsForDisplay.length === 0) {
    return <p>Not found</p>;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {hotelsForDisplay.map((hotel, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
              <HotelCard
                className={classes.card}
                brandName={hotel.brandName}
                hotelName={hotel.name}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  card: {
    padding: theme.spacing(2.5),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

HotelContainer.propTypes = {
  hotelsData: PropTypes.array.isRequired
};

export default HotelContainer;
