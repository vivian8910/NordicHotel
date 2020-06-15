export const toggleFavorite = (favHotels, setFavHotels, selectedHotel) => {
    if (!favHotels.some(hotel => hotel.name === selectedHotel.name)) {
      setFavHotels([...favHotels, selectedHotel])
    } else {
      setFavHotels(favHotels.filter((favHotel) => favHotel.name !== selectedHotel.name ))
    }
  };