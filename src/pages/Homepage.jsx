import { useEffect, useState } from "react"
import GameCards from "../components/GameCards";

export default function Homepage(){

  const url = import.meta.env.VITE_API_URL;
  const [ games, setGames ] = useState([]);

  const fetchGames = async () => {
    try{
      const response = await fetch(`${url}/games`);
      //console.log(response);
      if(!response.ok){
        throw new Error("Errore nella richiesta dei giochi");
      }
      const data = await response.json();
      //console.log(data);
      setGames(data);
    }
    catch(error){
      console.error("Errore nel caricamento dei giochi", error);
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  return(
    <>
      <div className="container text-center d-flex align-items-center p-5">
        <div className="row">
        {
          games.map(game => (
            <div key={game.id} className="col-4">
              <GameCards game={game} />
            </div>
          ))
        }
        </div>
      </div>
    </>
  )
}