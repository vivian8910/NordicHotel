import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HotelCard from "./hotelCard.js";
import Grid from "@material-ui/core/Grid";

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

const HotelContainer = props => {
  const classes = useStyles();
  const { hotelsData, match, history, wishlist } = props;


  const handleFilter = value => {
    if (value === "All") {
      return hotelsData;
    } else {
      return hotelsData.filter(hotel => hotel.address.city === value);
    }
  };

  const handleSearch = value => {
    return hotelsData.filter(hotel => hotel.name === value);
  };

  const handleFilterData = () => {
    if (history.location.pathname === "/hotels") {
      if (history.location.search) {
        return handleSearch(history.location.search.split("=")[1].split('-').join(' '));
      }
    } else if (history.location.pathname === "/") {
      return hotelsData;
    } else if (history.location.pathname === "/favoritelist") {
      return wishlist
    } else {
      return handleFilter(match.params.city);
    }
    return null
  };

  const hotelDataFiltered = handleFilterData();

  if (hotelDataFiltered && hotelDataFiltered.length === 0) {
    return (<p>No favorite hotels yet</p>)
  } 

  if (!hotelDataFiltered) {
    return (<p>Not found</p>)
  }
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {hotelDataFiltered.map((hotel, index) => {
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

export default HotelContainer;
