import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useGetGameDetails } from "./GameDetailsContext";

const ComparatorContext = createContext();

const ComparatorProvider = ({ children }) => {
  const [ comparedGames, setComparedGames ] = useState(() => {
    const savedComparedGames = localStorage.getItem("comparedGames");
    return savedComparedGames ? JSON.parse(savedComparedGames) : [];
  });

  useEffect(() => {
    localStorage.setItem("comparedGames", JSON.stringify(comparedGames));
  }, [comparedGames])

  const { getGameDetails } = useGetGameDetails();

  const addToCompare = useCallback(async (gameId) => {
    try {
      if (comparedGames.length === 4)
        return;

      const gameDetails = await getGameDetails(gameId);
      if (gameDetails && !comparedGames.some(game => game.id === gameId)) {
        setComparedGames(prevCompared => [...prevCompared, gameDetails]);
      }
    }
    catch (error) {
      console.error("Errore nell'aggiunta del gioco alla comparazione", error);
    }
  }, [getGameDetails, comparedGames])

  const removeFromCompare = useCallback(gameId => {
    setComparedGames(prevCompared => prevCompared.filter(game => game.id !== gameId));
  }, [])

  return(
    <ComparatorContext.Provider value={{ comparedGames, addToCompare, removeFromCompare }}>
      { children }
    </ComparatorContext.Provider>
  )
}

const useComparator = () => {
  const context = useContext(ComparatorContext);
  return context;
}

export { ComparatorProvider, useComparator }