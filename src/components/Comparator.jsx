import { useComparator } from "../contexts/ComparatorContext";
import ComparisonCard from "./ComparisonCard";

export default function Comparator(){
  const { comparedGames, removeFromCompare } = useComparator();

  let className = "";
  comparedGames.length === 1 ? className = "d-flex row row-cols-1" : className = "container-fluid row row-cols-2"
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
                    <div className="text-start my-4">
                      <ComparisonCard game={game} />
                    </div>

                    <button onClick={() => removeFromCompare(game.id)} className="btn btn-danger mt-3 w-100">Rimuovi dal confronto</button>
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