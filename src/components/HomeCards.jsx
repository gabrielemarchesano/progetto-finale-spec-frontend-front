import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useComparator } from "../contexts/ComparatorContext";

export default function HomeCards({ game }){
  /* console.log(game) */
  const { title, category, description } = game;
  const { wishlist, addToWishlist } = useWishlist();
  const { comparedGames, addToCompare } = useComparator();

  return(
    <div className="card">
      <div className="card-body py-5">

        <Link to={`/games/${game.id}`} className="game-title text-decoration-none text-black">
          <h3 className="game-title">{title}</h3>
        </Link>
        
        <p>{category}</p>
        <p>{description}</p>
        
        <div className="buttons">
          <button onClick={() => addToWishlist(game.id)} className="btn btn-outline-primary">
            {
              wishlist.find(g => g.id === game.id) ? "Gioco già in wishlist" : "Aggiungi alla wishlist"
            }
          </button>
          
          <button onClick={() => addToCompare(game.id)} className="btn btn-outline-secondary">
            {
              comparedGames.find(g => g.id === game.id) ? "Gioco già in confronto" : "Aggiungi al confronto"
            }
          </button>

        </div>

      </div>

    </div>
  )
}