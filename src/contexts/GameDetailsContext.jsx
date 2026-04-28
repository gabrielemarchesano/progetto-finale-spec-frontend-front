import { createContext, useContext } from "react";

const url = import.meta.env.VITE_API_URL;

const GameDetailsContext = createContext();

const GameDetailsProvider = ({ children }) => {
  const getGameDetails = async (gameId) => {
    try{
      const response = await fetch(`${url}/games/${gameId}`);
      if(!response.ok){
        throw new Error("Errore nella richiesta dei dettagli del gioco");
      }
      
      const data = await response.json();
      return data.game;
    }
    catch(error){
      console.error("Errore nel caricamento dei dettagli del gioco", error);
    }
  }

  return(
    <GameDetailsContext.Provider value={{ getGameDetails }}>
      { children }
    </GameDetailsContext.Provider>
  )
}

const useGetGameDetails = () => {
  const context = useContext(GameDetailsContext);
  return context;
}

export { GameDetailsProvider, useGetGameDetails }