import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useComparator } from "../contexts/ComparatorContext";
import React from "react";


function HomeCards({ game }){
  /* console.log(game) */
  // Destrutturazione delle proprietà del gioco
  const { title, category, description } = game;
  // Recupero della wishlist e della funzione per aggiungere un gioco nella lista
  const { wishlist, addToWishlist } = useWishlist();
  // Reupero della lista da confrontare e la funzione per aggiungere un gioco alla lista
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