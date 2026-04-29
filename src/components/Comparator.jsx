import { useComparator } from "../contexts/ComparatorContext";

export default function Comparator(){
  const { comparedGames, removeFromCompare } = useComparator();

  let className = "";
  comparedGames.length === 1 ? className = "row row-cols-1" : className = "row row-cols-2"
  return(
    <div className="container text-center">
      {
        comparedGames.length >= 1 && (
          <div>
            <h2>Confronta due giochi</h2>
              <div className={className}>
              {
                comparedGames.map(game => (
                  <div key={game.id}>
                    <img src={game.imageUrl} alt="" />
                    <h1>{game.title}</h1>
                    <p>{game.category}</p>
                    <p>Piattaforme: {game.platforms.join(", ")}</p>
                    <p>Genere: {game.genres.join(", ")}</p>
                    <p>{game.description}</p>
                    <p>Casa di sviluppo: {game.developer}</p>
                    <p>Pegi: {game.pegi}</p>
                    <p>{game.price} €</p>
                    <p>Data di rilascio: {game.releaseYear}</p>

                    <button onClick={() => removeFromCompare(game.id)}>Rimuovi dal confronto</button>
                  </div>
                ))
              }
              </div>
          </div>
        )
      }
    </div>
  )
}