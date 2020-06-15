import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import PropTypes from "prop-types";
import { useLocalStorage } from "../hooks/useLocalStorage"
import { toggleFavorite } from "../helper";

import HotelCard from "./hotelCard.js";

const HotelContainer = ({ hotelsData, match, history }) => {
  const [favHotels, setFavHotels] = useLocalStorage("favHotels", []);

  const classes = useStyles();

  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // process data according to different routes
  const extractHotelsForDisplay = () => {
    if (history.location.pathname === "/") {
      return hotelsData;
    }
    if (history.location.pathname === "/favoritelist") {
      return favHotels || [];
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

  const paginationCount = (displayedHotels) => {
    return displayedHotels % 12 === 0 ? Math.floor(displayedHotels / 12) : Math.floor(displayedHotels / 12) + 1; 
  }

  const count = paginationCount(hotelsForDisplay.length);

  useEffect(() => {
    setPage(1)
  }, [history.location.pathname, count]);

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
      <Grid container spacing={2}>
        {hotelsForDisplay.slice((page - 1) * 12, page * 12).map((hotel, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
              <HotelCard
                className={classes.card}
                brandName={hotel.brandName}
                hotelName={hotel.name}
                handleClick={() => toggleFavorite(favHotels, setFavHotels, hotel)}
                favHotels={favHotels}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box className={classes.ul}>
        <Pagination 
          count={count}
          page={page} 
          onChange={handleChange}
        />
      </Box>
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
  },
  ul: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem"
  }
}));

HotelContainer.propTypes = {
  hotelsData: PropTypes.array.isRequired
};

export default HotelContainer;
