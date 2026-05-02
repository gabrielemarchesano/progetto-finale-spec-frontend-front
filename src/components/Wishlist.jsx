import { useWishlist } from "../contexts/WishlistContext";

export default function Wishlist(){
  const { wishlist, removeFromWishlist } = useWishlist();

  return(
    <div>
      {
        wishlist.length === 0 ? (
          <p className="px-3">La tua lista dei preferiti è vuota.</p>
        ) : (
          <div>
            {
              wishlist.map(game => (
                <div className="wishlist-card card p-3" key={game.id}>
                  <h3>{game.title}</h3>
                  <p>{game.category}</p>
                  <p>{game.price} €</p>
                  <button className="btn btn-danger w-50 align-self-end" onClick={() => removeFromWishlist(game.id)}>Rimuovi dai preferiti</button>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}