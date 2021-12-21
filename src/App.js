import React, { useState, useEffect } from "react";
import axios from 'axios'
import PokemonList from "./components/PokeList";
import Pagination from "./components/Pagination";

function App() {
  const [pokemon, setPokemon] = useState([])


  const [currentPageUrl, setCurrentPageUrl] = useState ("https://pokeapi.co/api/v2/pokemon")

  const [nexttPageUrl, setNextPageUrl] = useState ()
  const [prevPageUrl, setPrevPageUrl] = useState () 
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
    setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }, [currentPageUrl])

  function gotoNextPage () {
    setCurrentPageUrl(nexttPageUrl)
  }

  function gotoPrevPage () {
    setCurrentPageUrl(prevPageUrl)
  }


  
  if (loading) return 'Loading...'

  return (<>
    <PokemonList pokemon={pokemon} />
    <Pagination 
    gotoNextPage={nexttPageUrl ? gotoNextPage : null}
    gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
    />
    </>
  );
}

export default App;
