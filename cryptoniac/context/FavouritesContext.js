import React, { createContext, useState } from 'react';

export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = crypto => {
    // Ensure the crypto object has necessary properties
    if (!crypto || !crypto.id) {
      console.error("Attempted to add invalid crypto to favorites:", crypto);
      return; // Prevent adding invalid data
    }
    setFavourites(prevFavourites => [...prevFavourites, crypto]);
  };

  const removeFavourite = cryptoId => {
    setFavourites(prevFavourites => prevFavourites.filter(fav => fav.id !== cryptoId));
  };

  return (
    <FavouriteContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};
