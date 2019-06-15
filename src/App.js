import React, { useState } from "react";
import "./App.css";
import HotelContainer from "./components/hotelContainer.js";
import SearchBar from "./components/searchBar.js";
import HotelDetails from "./components/hotelDetails.js";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import hotels from "./data/data.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003f54",
      light: "#3a6a81"
    }
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

// make a state so that can pass a callback to change from child
// const hotelsData = hotels.hotels;

const App = () => {
  const [hotelsData, setHotelsData] = useState(hotels.hotels)
  const [wishlist, setWishlist] = useState([])

  const addFavoriteProperty = (value) => {
    setHotelsData(value)
  }

  const addHotelToWishlist = (value) => {
    setWishlist([...wishlist, value])
  }

  const removeHotelFromWishlist = (value) => {
    setWishlist(wishlist.filter(item => item !== value))
  }

  console.log(wishlist)

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <SearchBar hotelsData={hotelsData} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <HotelContainer {...props} hotelsData={hotelsData} />
              )}
            />
            <Route
              path="/location/:city"
              render={props => (
                <HotelContainer {...props} hotelsData={hotelsData} />
              )}
            />
            <Route
              path="/hotels"
              render={props => (
                <HotelContainer {...props} hotelsData={hotelsData} />
              )}
            />
            <Route
              path="/hoteldetails"
              render={props => (
                <HotelDetails {...props} hotelsData={hotelsData} 
                addFavoriteProperty={addFavoriteProperty}
                addHotelToWishlist={addHotelToWishlist}
                removeHotelFromWishlist={removeHotelFromWishlist}
                wishlist={wishlist}
                />
              )}
            />
            <Route path="/favoritelist" render={props=>(
              <HotelContainer {...props}  hotelsData={hotelsData} wishlist={wishlist}/>
            )}/>
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
