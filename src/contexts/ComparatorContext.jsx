import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useGetGameDetails } from "./GameDetailsContext";

// Creazione del contesto
const ComparatorContext = createContext();

// Definizione del provider
const ComparatorProvider = ({ children }) => {
  // Inizializzazione dello stato della lista dei giochi a confronto, recuperando i dati dal localStorage se presenti
  const [ comparedGames, setComparedGames ] = useState(() => {
    // Recupero la lista dei giochi a confronto salvata nel localStorage
    const savedComparedGames = localStorage.getItem("comparedGames");
    // Se esiste, si converte da stringa JSON a array, altrimenti si inizializza come array vuoto
    return savedComparedGames ? JSON.parse(savedComparedGames) : [];
  });

  // Quando la lista cambia, si aggiorna il localStorage con la nuova lista
  useEffect(() => {
    localStorage.setItem("comparedGames", JSON.stringify(comparedGames));
  }, [comparedGames])

  // Recupero della funzione getGameDetails dal contesto dei dettagli del gioco
  const { getGameDetails } = useGetGameDetails();

  // Funzione per aggiungere un gioco al confronto
  const addToCompare = useCallback(async (gameId) => {
    try {
      // Se la lista ha già 4 giochi, non viene aggiunto nessun altro gioco
      if (comparedGames.length === 4)
        return;

      // Chiamata asincrona per ottenere i dettagli del gioco
      const gameDetails = await getGameDetails(gameId);

      // Se i dettagli del gioco sono stati recuperati correttamente e il gioco non è già presente nella lista, si aggiunge alla lista
      if (gameDetails && !comparedGames.some(game => game.id === gameId)) {
        setComparedGames(prevCompared => [...prevCompared, gameDetails]);
      }
    }
    catch (error) {
      console.error("Errore nell'aggiunta del gioco alla comparazione", error);
    }
  }, [getGameDetails, comparedGames])

  // Funzione per rimuovere un gioco dal confronto
  const removeFromCompare = useCallback(gameId => {
    setComparedGames(prevCompared => prevCompared.filter(game => game.id !== gameId));
  }, [])

  return(
    // La lista dei giochi a confronto e le funzioni per aggiungere o rimuovere un gioco vengono rese accessibili a tutti i componenti figli
    <ComparatorContext.Provider value={{ comparedGames, addToCompare, removeFromCompare }}>
      { children }
    </ComparatorContext.Provider>
  )
}

// Custom hook per consumare il contesto
const useComparator = () => {
  const context = useContext(ComparatorContext);
  return context;
}

export { ComparatorProvider, useComparator }