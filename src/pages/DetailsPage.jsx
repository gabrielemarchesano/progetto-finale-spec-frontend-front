import { useParams } from "react-router-dom";
import { useGetGameDetails } from "../contexts/GameDetailsContext";
import { useEffect, useState } from "react";

export default function DetailsPage(){

  const [ gameDetails, setGameDetails ] = useState();
  const { id } = useParams();
  const { getGameDetails } = useGetGameDetails();

  const fetchGameDetails = async () => {
    const data = await getGameDetails(id);
    //console.log(data)
    setGameDetails(data);
  }

  useEffect(() => {
    fetchGameDetails()
  }, []);

  return(
    <div>
      {
        gameDetails && (
          <div>
            <img src={gameDetails.imageUrl} alt="" />
            <h1>{gameDetails.title}</h1>
            <p>{gameDetails.category}</p>
            <p>Piattaforme: {gameDetails.platforms.join(", ")}</p>
            <p>Genere: {gameDetails.genres.join(", ")}</p>
            <p>{gameDetails.description}</p>
            <p>Casa di sviluppo: {gameDetails.developer}</p>
            <p>Pegi: {gameDetails.pegi}</p>
            <p>{gameDetails.price} €</p>
            <p>Data di rilascio: {gameDetails.releaseYear}</p>
          </div>
        )
      }
    </div>
  )
}