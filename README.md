A single page application written with React, material-ui, react-router to search, filter and save favorite hotels.

## How to start:

To get the frontend running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server (this project uses create-react-app)


## Functionality overview

- Type in hotel name in the input field with an autocomplete in navBar to search for the hotel.
- Click on the location icon in navbar to filter hotels by location.
- Click on the 'Learn more' button on a hotel, you will be redirected to the details of the hotel where you can click on the favorite icon to save and remove the hotel from the favorite list. Now you can also add favorite hotel in the homepage.
- Click on the favorite icon in the navbar, you should see the hotels that you saved in the favorite list.


## Things to note
- material-ui is used to build the UI as quickly as possible.
- The data provided has a few situations which will break the app (e.g. city and destinationname both being null), so functions which may seem a bit specific are written to prevent that.

