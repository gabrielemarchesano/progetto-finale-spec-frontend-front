import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useComparator } from "../contexts/ComparatorContext";
import React from "react";


function HomeCards({ game }){
  /* console.log(game) */
  const { title, category, description } = game;
  const { wishlist, addToWishlist } = useWishlist();
  const { comparedGames, addToCompare } = useComparator();

  return(
    <div className="card shadow-sm">
      <div className="card-body py-5">

        <Link to={`/games/${game.id}`} className="game-title text-decoration-none text-black">
          <h3 className="game-title">{title}</h3>
        </Link>
        
        <p>{category}</p>
        <p>{description}</p>
        
        <div className="buttons btn-group gap-3">
          <button onClick={() => addToWishlist(game.id)} className="home-cards-btns btn btn-outline-primary">
            {
              wishlist.find(g => g.id === game.id) ? "Gioco già in wishlist" : "Preferiti"
            }
          </button>
          
          <button onClick={() => addToCompare(game.id)} className="home-cards-btns btn btn-outline-secondary">
            {
              comparedGames.find(g => g.id === game.id) ? "Gioco già in confronto" : "Confronta"
            }
          </button>

        </div>

      </div>

    </div>
  )
}

export default React.memo(HomeCards);