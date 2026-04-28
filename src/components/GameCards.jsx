import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useComparator } from "../contexts/ComparatorContext";

export default function GameCards({ game }){
  /* console.log(game) */
  const { title, category, description } = game;
  const { addToWishlist } = useWishlist();
  const { comparedGames, addToCompare } = useComparator();

  return(
    <>
      <div>
        <Link to={`/games/${game.id}`} className="text-decoration-none text-black">
          <h3>{title}</h3>
        </Link>
        <p>{category}</p>
        <p>{description}</p>
        <button onClick={() => addToWishlist(game.id)}>Aggiungi ai preferiti</button>
        <button onClick={() => addToCompare(game.id)}>
          {
            comparedGames.find(g => g.id === game.id) ? "Gioco già in confronto" : "Aggiungi al confronto"
          }
        </button>
      </div>
    </>
  )
}