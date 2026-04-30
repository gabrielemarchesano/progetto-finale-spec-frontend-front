import { useParams } from "react-router-dom";
import { useGetGameDetails } from "../contexts/GameDetailsContext";
import { useEffect, useState } from "react";
import DetailsCard from "../components/DetailsCard";

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
    <div className="container py-3">
      {
        gameDetails && (
          <DetailsCard gameDetails={gameDetails} />
        )
      }
    </div>
  )
}