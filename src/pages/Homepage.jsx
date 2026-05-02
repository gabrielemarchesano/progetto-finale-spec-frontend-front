import { useEffect, useState, useCallback } from "react"
import HomeCards from "../components/HomeCards";
import Comparator from "../components/Comparator";

function debounce(callback, delay){
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  }
}

export default function Homepage(){

  const url = import.meta.env.VITE_API_URL;

  const [ games, setGames ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ selectedCategory, setSelectedCategory ] = useState("");
  const [ sortBy, setSortBy ] = useState("");
  const [ sortOrder, setSortOrder ] = useState(1);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 300),
    []
  );
  
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
        
        <div className="list-manipulator d-flex flex-column align-items-center gap-4">

          <div className="row gap-1">
            <input
              type="text"
              placeholder="Cerca un gioco..."
              onChange={(event) => debouncedSearch(event.target.value)}
              className="form-control"
            />
            <select onChange={event => setSelectedCategory(event.target.value)} className="form-select">
              <option value="">Filtra per categoria</option>
              {
                categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="btn-group">
            <button onClick={() => {
              setSortBy("title")
              setSortOrder(sortOrder * -1)
            }} className="btn btn-secondary">
              Ordina per titolo
            </button>
            <button onClick={() => {
              setSortBy("category")
              setSortOrder(sortOrder * -1)
            }} className="btn btn-secondary">
              Ordina per categoria
            </button>
            <button onClick={() => {
              setSortBy("")
              setSortOrder(1)
            }} className="btn btn-warning">
              Reset ordinamento
            </button>
          </div>

        </div>

        <div className="d-flex text-center align-items-center">
          
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 w-100">
          {
            sortedAndFilteredGames.length > 0 ? (
              sortedAndFilteredGames.map(game => (
                <div key={game.id} className="p-5">
                  <HomeCards game={game} />
                </div>
              ))
            ) : (
              <div className="col-12 p-5">
                <h2>Nessun risultato trovato</h2>
              </div>
            )
          }
          </div>

        </div>

          <Comparator />

      </div>
    </>
  )
}