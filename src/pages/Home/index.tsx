import { Component, ReactNode } from "react"
import { connect } from "react-redux"
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit"

import { ApplicationState } from "../../store"

import { Pokemon } from "../../store/ducks/pokemons/types"
import * as PokemonsActions from '../../store/ducks/pokemons/actions'

import { Card } from "../../components/Card"

import './styles.css'
import PokemonInformations from "../../components/PokemonInformations"
import Pagination from "./components/pagination"
import Filter from "./components/filter"

interface StateProps {
    pokemons: Pokemon[];
    offset: number;
    limit: number;
}

interface DispatchProps {
    loadRequest(data: { offset: number; limit: number }): void;
    pokemonRequest(data: {name: string}): void;
}

type Props = StateProps & DispatchProps

class PokemonList extends Component<Props>{
    getPokemonInformation = (nameCurrent: string) => {
        const { pokemonRequest } = this.props;
        pokemonRequest({ name: nameCurrent })
      }

    componentDidMount(): void {
        const { loadRequest, offset, limit } = this.props;
        loadRequest({offset: offset, limit: limit})
    }


    render(): ReactNode {  
        const { pokemons, } = this.props;
        return(
            <div className="HomeHeader">
                <Filter/>
                <div className="HomeBody">
                <div className="PokemonList">
                    {pokemons.map(pokemon =>{
                        return (
                            <div className="pokemonSelectable" onClick={()=>{this.getPokemonInformation(pokemon.name)}}>
                                <Card pokemonName={pokemon.name} />
                            </div>
                        )
                    })}
                    <Pagination/>
                </div>
                <div className="PokemonInformation">
                    <PokemonInformations/>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    pokemons: state.pokemons.results,
    offset: state.pokemons.offset,
    limit: state.pokemons.limit,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(PokemonsActions, dispatch) 

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList)