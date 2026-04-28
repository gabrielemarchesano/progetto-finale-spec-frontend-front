import { createContext, useContext, useState } from "react";
import { useGetGameDetails } from "./GameDetailsContext";

const ComparatorContext = createContext();

const ComparatorProvider = ({ children }) => {
  const [ comparedGames, setComparedGames ] = useState([]);
  const { getGameDetails } = useGetGameDetails();

  const addToCompare = async (gameId) => {
    try{
      if(comparedGames.length === 2)
        return;

      const gameDetails = await getGameDetails(gameId);
      if(gameDetails && !comparedGames.some(game => game.id === gameId)){
        setComparedGames(prevCompared => [...prevCompared, gameDetails]);
      }
    }
    catch(error){
      console.error("Errore nell'aggiunta del gioco alla comparazione", error);
    }
  }

  const removeFromCompare = (gameId) => {
    setComparedGames(prevCompared => prevCompared.filter(game => game.id !== gameId));
  }

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