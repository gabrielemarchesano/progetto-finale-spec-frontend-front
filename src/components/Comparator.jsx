import { useComparator } from "../contexts/ComparatorContext";
import ComparisonCard from "./ComparisonCard";

export default function Comparator(){
  const { comparedGames, removeFromCompare } = useComparator();

  const className = `container row row-cols-1 row-cols-md-2 row-cols-lg-${comparedGames.length} justify-content-center`
  
  return(
    <div className="container text-center">
      {
        comparedGames.length >= 1 && (
          <div>
            <h2>Confronta i giochi</h2>
              <div className={className}>
              {
                comparedGames.map(game => (
                  <div key={game.id} className="col d-flex flex-column">
                    <div className="flex-grow-1 text-start my-4">
                      <ComparisonCard game={game} />
                    </div>

                    <button onClick={() => removeFromCompare(game.id)} className="btn btn-danger mt-auto w-100">Rimuovi dal confronto</button>
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