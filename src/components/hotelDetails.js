import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

const HotelDetails = props => {
  const classes = useStyles();

  const { history, 
          hotelsData, 
          addFavoriteProperty, 
          addHotelToWishlist, 
          removeHotelFromWishlist, 
          wishlist } 
  = props;

  const hotelName = history.location.pathname.split("/")[2].split('-').join(' ');
  const favHotel = hotelsData.filter(hotel => hotel.name === hotelName);
  const favHotelIndex = hotelsData.indexOf(favHotel[0])

  const [expanded, setExpanded] = useState(false);

  // const [fav, setFav] = useState(hotelsData[favHotelIndex].isFavorite);

  const handleExpandClick = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };

  const handleClick = () => {
    // setFav(prevFav => !prevFav);
    // const hotelsDataCopy = hotelsData
    // hotelsDataCopy[favHotelIndex].isFavorite = fav
    // console.log('//////',hotelsDataCopy)

    addFavoriteProperty(prevHotels => {
      const hotelsCopy = [...prevHotels]
      // hotelsCopy[favHotelIndex].isFavorite = true;
      if (wishlist.includes(hotelsCopy[favHotelIndex])){
        hotelsCopy[favHotelIndex].isFavorite = false
      } else {
        hotelsCopy[favHotelIndex].isFavorite = true;
      }
      return hotelsCopy
    })
    
    if (hotelsData[favHotelIndex].isFavorite === true){
      addHotelToWishlist(hotelsData[favHotelIndex])
    } else {
      removeHotelFromWishlist(hotelsData[favHotelIndex])
    }
    
    
  };

  return(
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            Nordic Hotel
          </Avatar>
        }
        action={
          <IconButton aria-label="Add to favorites" onClick={handleClick}>
            <FavoriteIcon
              className={hotelsData[favHotelIndex].isFavorite ? classes.button : ""}
            />
          </IconButton>
        }
        title={hotelName}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default HotelDetails;
