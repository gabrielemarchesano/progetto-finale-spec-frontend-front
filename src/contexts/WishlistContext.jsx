import { createContext, useCallback, useContext, useState } from "react";
import { useGetGameDetails } from "./GameDetailsContext";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [ wishlist, setWishlist ] = useState([]);

  const { getGameDetails } = useGetGameDetails();

  const addToWishlist = useCallback(async (gameId) => {
    try {
      console.log(gameId)
      const gameDetails = await getGameDetails(gameId);
      if (gameDetails && !wishlist.some(game => game.id === gameId)) {
        setWishlist(prevWishlist => [...prevWishlist, gameDetails]);
      }
    }
    catch (error) {
      console.error("Errore nell'aggiunta del gioco alla wishlist", error);
    }
  }, [getGameDetails, wishlist])

  const removeFromWishlist = useCallback((gameId) => {
    setWishlist(prevWishlist => prevWishlist.filter(game => game.id !== gameId));
  }, [])

  return(
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      { children }
    </WishlistContext.Provider>
  )
}

const useWishlist = () => {
  const context = useContext(WishlistContext);
  return context;
}

export { WishlistProvider, useWishlist}