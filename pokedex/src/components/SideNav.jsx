import { useState } from "react"
import { first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav(props){
    const {selectedPokemon , setSelectedPokemon} = props
    const [searchValue , setSearchValue] = useState('')
    const filteredPokemon = first151Pokemon.filter((ele ,eleIndex) => {
        // if full pokedex no includes current search value return true
        if((getFullPokedexNumber(eleIndex)).includes(searchValue)) { return true }
        
        // if pokemon name includes current search value return true
        if(ele.toLowerCase().includes(searchValue.toLowerCase())) {return true}
        // otherwise exclude from the array
        return false
    })
    return(
        <nav>
            <div className={"header"}>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <input value={searchValue} onChange={(e) => {
                setSearchValue(e.target.value)}} type="text" placeholder="Pokémon"/>
            {
                filteredPokemon.map((pokemon,pokemonIndex) => {
                    return(
                        <button onClick={() => {
                            setSelectedPokemon(pokemonIndex)
                        }} key={pokemonIndex} className={'nav-card ' + (pokemonIndex == selectedPokemon ? 'nav-card-selected' : ' ')}>
                            <p>{getFullPokedexNumber(first151Pokemon.indexOf(pokemon))}</p>
                            <p>{pokemon}</p>
                        </button>
                    )
                })
            }
        </nav>
    )
}