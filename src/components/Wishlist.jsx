import { useWishlist } from "../contexts/WishlistContext";

export default function Wishlist(){
  const { wishlist, removeFromWishlist } = useWishlist();

  return(
    <div>
      {
        wishlist.length === 0 ? (
          <p>La tua lista dei preferiti è vuota.</p>
        ) : (
          <ul>
            {
              wishlist.map(game => (
                <li key={game.id}>
                  <h3>{game.title}</h3>
                  <p>{game.category}</p>
                  <p>{game.price} €</p>
                  <button onClick={() => removeFromWishlist(game.id)}>Rimuovi dai preferiti</button>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}