import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import  TypeCard  from "./TypeCard"

export default function PokeCard(props){
    const {selectedPokemon} = props
    const [data , setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const {name , height , abilities , stats , types , moves, sprites} = data || {}

    const imgList = Object.keys(sprites || {}).filter(val => {
        if(!sprites[val]) {return false}
        if(['versions' , 'other'].includes(val)) {return false}
        return true
    })
    useEffect(() => {
        // if loading , exit loop
        if(loading || !localStorage) {return}

        // check if selectedPokemon info is available in cache
        //1. define cache
        let cache = {}
        if(localStorage.getItem('pokedex')){
            cache = JSON.parse(localStorage.getItem('pokedex'))
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
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
                const finalUrl = baseUrl + suffix
                const res = await fetch(finalUrl)
                const pokemonData = await res.json()
                setData(pokemonData)
                console.log(pokemonData);
                
                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex',JSON.stringify(cache))
            } catch (error) {
                console.log(error.message);
            }finally{
                setLoading(false)
            }
        }
        fetchPokemonData()
        // if we fetch then save to cache for next time
    } , [selectedPokemon])

    if(loading || !data){
        return(
            <div><h4>Loading...</h4></div>
        )
    }

    return(
        <div className="poke-card">
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj, typeIndex) => {
                    return(
                        <TypeCard key = {typeIndex} type = {typeObj?.type?.name}/>
                    )
                })}
            </div>
            <img src= {'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'} alt={`${name}-large-img`} className="default-img" />
            <div className="image-container">
                {imgList.map((spriteUrl , spriteIndex) => {
                    const imgUrl = sprites[spriteUrl]
                    return(
                        <img key={spriteIndex} src={imgUrl} alt ={`${name}-img-${spriteUrl}`}/>
                    )
                })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {stats.map((statObj , statIndex) => {
                    const {stat , base_stat} = statObj
                    return(
                        <div className="stat-item" key= {statIndex}>
                            <p>{stat?.name.replaceAll('-' , ' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <h3>Moves</h3>
            <div className="pokemon-move-grid">
                {moves.map((moveObj , moveIndex) => {
                    return(
                        <button className="button-card pokemon-move" key = {moveIndex} onClick={() => {}}>
                            <p>{moveObj?.move?.name.replaceAll('-' , ' ')}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}