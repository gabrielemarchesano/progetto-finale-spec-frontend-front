import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useGetGameDetails } from "./GameDetailsContext";

// Creazione del contesto
const WishlistContext = createContext();

// Definizione del provider
const WishlistProvider = ({ children }) => {
  // Inizializzazione dello stato della wishlist, recuperando i dati dal localStorage se presenti
  const [ wishlist, setWishlist ] = useState(() => {
    // Recupero della wishlist salvata nel localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    // Se esiste, si converte da stringa JSON a array, altrimenti si inizializza come array vuoto
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Quando la wishlist cambia, si aggiorna il localStorage con la nuova wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist])

  // Recupero della funzione getGameDetails dal contesto dei dettagli del gioco
  const { getGameDetails } = useGetGameDetails();

  // Funzione per aggiungere un gioco alla wishlist
  const addToWishlist = useCallback(async (gameId) => {
    try {
      //console.log(gameId)
      // Chiamata asincrona per ottenere i dettagli del gioco da aggiungere alla wishlist
      const gameDetails = await getGameDetails(gameId);
      // Se i dettagli del gioco sono stati recuperati correttamente e il gioco non è già presente nella wishlist, si aggiunge alla wishlist
      if (gameDetails && !wishlist.some(game => game.id === gameId)) {
        setWishlist(prevWishlist => [...prevWishlist, gameDetails]);
      }
    }
    catch (error) {
      console.error("Errore nell'aggiunta del gioco alla wishlist", error);
    }
  }, [getGameDetails, wishlist])

  // Funzione per rimuovere un gioco dalla wishlist
  const removeFromWishlist = useCallback((gameId) => {
    setWishlist(prevWishlist => prevWishlist.filter(game => game.id !== gameId));
  }, [])

  return(
    // La wishlist e le funzioni per aggiungere e rimuovere giochi vengono rese accessibili a tutti i componenti figli
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      { children }
    </WishlistContext.Provider>
  )
}

// Custom hook per consumare il contesto
const useWishlist = () => {
  const context = useContext(WishlistContext);
  return context;
}

export { WishlistProvider, useWishlist}