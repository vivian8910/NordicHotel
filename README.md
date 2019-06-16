A single page application written with React, material-ui, react-router to search, filter and save favorite hotels.

## How to start:

To get the frontend running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server (this project uses create-react-app)


## Functionality overview

- Type in hotel name in the input field with an autocomplete in navBar to search for the hotel.
- Click on the location icon in navbar to filter hotels by location.
- Click on the 'Learn more' button on a hotel, you will be redirected to the details of the hotel where you can click on the     favorite icon to save and remove the hotel from the favorite list.
- Click on the favorite icon in the navbar, you should see the hotels that you saved in the favorite list.


## Things to note
- material-ui is used to build the UI as quickly as possible.
- The favorite list will disappear if you refresh the page since it is not stored anywhere else except the state, you should 
  be able to see them when you navigate within the website.
- The data provided has a few situations which will break the app, so functions which may seem a bit specific are written to     prevent that.
- Not enough time to implement the google map feature.

