import { createContext, useContext, useState } from "react";
import { useGetGameDetails } from "./GameDetailsContext";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [ wishlist, setWishlist ] = useState([]);

  const { getGameDetails } = useGetGameDetails();

  const addToWishlist = async (gameId) => {
    try{
      console.log(gameId)
      const gameDetails = await getGameDetails(gameId);
      if(gameDetails && !wishlist.find(game => game.id === gameId)){
        setWishlist(prevWishlist => [...prevWishlist, gameDetails]);
      }
    } 
    catch(error){
      console.error("Errore nell'aggiunta del gioco alla wishlist", error);
    }
  }

  const removeFromWishlist = (gameId) => {
    setWishlist(prevWishlist => prevWishlist.filter(game => game.id !== gameId));
  }

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