import { useEffect, useState } from "react"
import GameCards from "../components/GameCards";

export default function Homepage(){

  const url = import.meta.env.VITE_API_URL;

  const [ games, setGames ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ selectedCategory, setSelectedCategory ] = useState("");
  const [ sortBy, setSortBy ] = useState("");
  const [ sortOrder, setSortOrder ] = useState(1);

  
  const categories = [];
  games?.forEach(game => {
    if(!categories.includes(game.category)){
      categories.push(game.category);
    }
  });

  const fetchGames = async () => {
    try{
      const response = await fetch(`${url}/games`);
      //console.log(response);
      if(!response.ok){
        throw new Error("Errore nella richiesta dei giochi");
      }
      const data = await response.json();
      //console.log(data);
      setGames(data);
    }
    catch(error){
      console.error("Errore nel caricamento dei giochi", error);
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  const sorted = [...games];

  const sortedAndFilteredGames = sorted
    .sort((a, b) => {
      if(sortBy === "title"){
        return sortOrder * a.title.localeCompare(b.title);
      } else if(sortBy === "category"){
        return sortOrder * a.category.localeCompare(b.category);
      }
    })
    .filter(game => {
      const isInTitle = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const isInCategory = selectedCategory && game.category === selectedCategory || !selectedCategory;
      return isInTitle && isInCategory;
    });

  return(
    <>
      <div className="container p-5">
        
        <div className="list-manipulator text-center">
          <input
            type="text"
            placeholder="Cerca un gioco..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <select onChange={event => setSelectedCategory(event.target.value)}>
            <option value="">Filtra per categoria</option>
            {
              categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))
            }
          </select>
          <button onClick={() => {
            setSortBy("title")
            setSortOrder(sortOrder * -1)
          }}>
            Ordina per titolo
          </button>
          <button onClick={() => {
            setSortBy("category")
            setSortOrder(sortOrder * -1)
          }}>
            Ordina per categoria
          </button>
          <button onClick={() => {
            setSortBy("")
            setSortOrder(1)
          }}>
            Reset ordinamento
          </button>
        </div>

        <div className="d-flex text-center align-items-center">
          
          <div className="row">
          {
            sortedAndFilteredGames.map(game => (
              <div key={game.id} className="col-4">
                <GameCards game={game} />
              </div>
            ))
          }
          </div>
        </div>
      </div>
    </>
  )
}