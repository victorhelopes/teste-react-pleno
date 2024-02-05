import { Component, ReactNode } from "react";
import { ApplicationState } from "../../store";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";

import * as PokemonsActions from '../../store/ducks/pokemons/actions'
import { connect } from "react-redux";
import { StatisticProps } from "../../store/ducks/pokemons/types";

import './styles.css'

interface StateProps {
    name: string;
    imageUrl: string;
    types: string[];
    abilities: string[];
    stats: StatisticProps[];
}

interface DispatchProps {
    pokemonRequest(data: {name: string}): void;
}

type Props = StateProps & DispatchProps

class PokemonInformations extends Component<Props>{

    getPokemonInformation = (nameCurrent: string) => {
        const { pokemonRequest } = this.props;
        pokemonRequest({ name: nameCurrent })
    }

    render(): ReactNode{
        const { name,imageUrl,types,abilities,stats} = this.props;
        return(
            <div className="PokemonInformations">
               {name ?  <div className="PokemonInformationsBody">
                    <h2>{name}</h2>
                    <hr/>
                    <div className="Infos">
                        <div className="Img">
                            <img src={imageUrl} alt=""/>
                        </div>
                        <div className="Characteristics">
                            <div className="PokemonType">
                                <h3>Type:</h3>
                                {types.map((type)=>{
                                    return <p>{type}</p>
                                })}
                            </div>
                            <hr/>
                            <div>
                                <h3>Abilities:</h3>
                                {abilities.map((ability)=>{
                                    return <p>{ability}</p>
                                })}
                            </div>
                            <hr/>
                            <div>
                                <h3>Statistics:</h3>
                                {stats.map((stat)=>{
                                    return <p><b>{stat.stat}:</b> {stat.base_stat}</p>
                                })}
                            </div>
                        </div>
                    </div>
                </div>: 'Selecione um pokemon para ver as informações'}
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    name: state.pokemons.name,
    imageUrl: state.pokemons.imageUrl,
    types: state.pokemons.types,
    abilities: state.pokemons.abilities,
    stats: state.pokemons.stats,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(PokemonsActions, dispatch) 

export default connect(mapStateToProps, mapDispatchToProps)(PokemonInformations)