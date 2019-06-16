import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import AutoComplete from "./autoComplete.js";

const SearchAppBar = ({ hotelsData }) => {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const locations = getLocations(hotelsData);

  // sort the location by number of hotels
  const keysSorted = Object.keys(locations).sort((a, b) => {
    return locations[b] - locations[a];
  });

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => setIsDrawerOpen(false)}
    >
      <List>
        <Link
          to={{ pathname: "/location/All" }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem button>
            <ListItemText primary={`All (${hotelsData.length})`} />
          </ListItem>
        </Link>
        {keysSorted.map(city => (
          <Link
            to={{ pathname: `/location/${city}` }}
            style={{ textDecoration: "none", color: "black" }}
            key={city}
          >
            <ListItem button>
              <ListItemText primary={`${city} (${locations[city]})`} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Nordic Hotel
          </Typography>
          <AutoComplete hotelsData={hotelsData} />
          <Link
            to={{ pathname: "/favoritelist" }}
            style={{ textDecoration: "none", color: "white" }}
          >
            <FavoriteIcon className={classes.favorite} />
          </Link>
          <div>
            <LocationOnIcon
              className={classes.location}
              onClick={() => setIsDrawerOpen(true)}
              style={{ cursor: "pointer" }}
            />
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClick={() => setIsDrawerOpen(false)}
            >
              {sideList()}
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

// filter out the ones with '/' to not mess up routing
// the ones whose city name is null, use destinaton name
const getLocations = hotelsData => {
  const locations = {};
  hotelsData.forEach(hotel => {
    if (hotel.address.city && !hotel.address.city.includes("/")) {
      if (locations.hasOwnProperty(hotel.address.city)) {
        locations[hotel.address.city] += 1;
      } else {
        locations[hotel.address.city] = 1;
      }
    } else {
      if (hotel.destinationName) {
        if (locations.hasOwnProperty(hotel.destinationName)) {
          locations[hotel.destinationName] += 1;
        } else {
          locations[hotel.destinationName] = 1;
        }
      }
    }
  });
  return locations;
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  favorite: {
    marginLeft: 35
  },
  location: {
    marginLeft: 30,
    color: "white"
  },
  list: {
    width: 250
  }
}));

SearchAppBar.propTypes = {
  hotelsData: PropTypes.array.isRequired
};

export default SearchAppBar;
