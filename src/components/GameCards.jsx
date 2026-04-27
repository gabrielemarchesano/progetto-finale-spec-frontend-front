import { Link } from "react-router-dom";

export default function GameCards({ game }){
  /* console.log(game) */
  const { title, category, description } = game;

  return(
    <>
      <div>
        <Link to={`/games/${game.id}`} className="text-decoration-none text-black">
          <h2>{title}</h2>
        </Link>
        <p>{category}</p>
        <p>{description}</p>
      </div>
    </>
  )
}