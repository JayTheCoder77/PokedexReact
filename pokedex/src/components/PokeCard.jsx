import { useEffect, useState } from "react"
export function PokeCard(props){
    const {selectedPokemon} = props
    const [data , setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // if loading , exit loop
        if(loading || !localStorage) {return}

        // check if selectedPokemon info is available in cache
        //1. define cache
        let cache = {}
        if(localStorage.getItem('pokedex')){
            cache = JSON.parse(localStorage.getItem('pokemon'))
        }

        //2. check pokemon is in cache or else fetch from api
        if(selectedPokemon in cache){
            // read from cache
            setData(cache[selectedPokemon])
            return
        }
        // we will now fetch from api
        async function fetchPokemonData(){
            setLoading(true);
            try {
                const baseUrl = 'https://pokeapi.co/api/v2/';
                const suffix = 'pokemon'/ + selectedPokemon
                const finalUrl = baseUrl + suffix
            } catch (error) {
                console.log(error.message);
            }finally{
                setLoading(false)
            }
        }
        // if we fetch then save to cache for next time
    } , [selectedPokemon])
    return(
        <div></div>
    )
}