import { createContext, useContext } from "react";

const url = import.meta.env.VITE_API_URL;

// Creazione del contesto per i dettagli del gioco
const GameDetailsContext = createContext();

// Definizione del provider per i dettagli del gioco
const GameDetailsProvider = ({ children }) => {
  // Funzione per ottenere i dettagli di un gioco specifico
  const getGameDetails = async (gameId) => {
    try{
      // Fetch dei dettagli del gioco dal backend
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
    // La funzione getGameDetails viene resa accessibile a tutti i componenti figli
    <GameDetailsContext.Provider value={{ getGameDetails }}>
      { children }
    </GameDetailsContext.Provider>
  )
}

// Hook personalizzato per consumare il contesto
const useGetGameDetails = () => {
  const context = useContext(GameDetailsContext);
  return context;
}

export { GameDetailsProvider, useGetGameDetails }