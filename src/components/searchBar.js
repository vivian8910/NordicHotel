import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import AutoComplete from "./autoComplete.js";
import { Link } from "react-router-dom";

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

const SearchAppBar = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    setState({ ...state, [side]: open });
  };

  const { hotelsData } = props;
  
  // find the available locations and
  // filter out the ones with '/' to not mess up routing
  const emptyObject = {};
  hotelsData.map(hotel => {
    if (hotel.address.city && !hotel.address.city.includes("/")) {
      if (emptyObject.hasOwnProperty(hotel.address.city)) {
        emptyObject[hotel.address.city] += 1;
      } else {
        emptyObject[hotel.address.city] = 1;
      }
    } else {
      if (emptyObject.hasOwnProperty(hotel.destinationName)) {
        emptyObject[hotel.destinationName] += 1;
      } else {
        emptyObject[hotel.destinationName] = 1;
      }
    }
    return emptyObject;
  });

  // sort the location by number of hotels
  const keysSorted = Object.keys(emptyObject).sort((a, b) => {
    return emptyObject[b] - emptyObject[a];
  });

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
    >
      <List>
        <Link to={{pathname: "/location/All"}} style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemText
              primary={`All (${Object.values(emptyObject).reduce(
                (a, b) => a + b,
                0
              )})`}
            />
          </ListItem>
        </Link>
        {keysSorted.map((text, index) => (
          <Link
            to={{pathname: `/location/${text}`}}
            style={{ textDecoration: "none", color: "black" }}
            key={text}
          >
            <ListItem button >
              <ListItemText
                primary={
                  text !== "null" ? `${text} (${emptyObject[text]})` : ""
                }
              />
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
          <Link to={{pathname: "/favoritelist"}} style={{textDecoration: "none", color:"white"}}>
            <FavoriteIcon className={classes.favorite} />
          </Link>
          <div>
            <LocationOnIcon className={classes.location} onClick={toggleDrawer("right", true)} style={{cursor: "pointer"}}/>
            <Drawer
              anchor="right"
              open={state.right}
              onClose={toggleDrawer("right", false)}
            >
              {sideList("right")}
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default SearchAppBar;
