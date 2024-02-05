import { Dispatch, bindActionCreators } from "@reduxjs/toolkit"
import { ApplicationState } from "../../../../store"

import * as PokemonsActions from '../../../../store/ducks/pokemons/actions'
import { connect } from "react-redux"
import { Component, ReactNode } from "react";
import { TypeProps } from "../../../../store/ducks/pokemons/types";

import './styles.css'
import { Button } from "../../../../components/Button";

interface StateProps {
    types: TypeProps[];
    offset:number; 
    limit: number;
}

interface DispatchProps {
    typesRequest(): void;
    pokemonRequest(data: { name: string }): void;
    pokemonsWithSelectedTypeRequest(data: string): void;
    loadRequest(data: { offset: number; limit: number }): void;
}


type Props = StateProps & DispatchProps
class Filter extends Component<Props>{
    componentDidMount(): void {
        const { typesRequest } = this.props;
        typesRequest();
    }

    handleCleanFilter = () =>{
        const { loadRequest, offset, limit } = this.props;
        loadRequest({offset: offset, limit: limit})
        this.setState({ name: ''})
    }
    
    handleSubmitType = () => {
        const { pokemonRequest,pokemonsWithSelectedTypeRequest } = this.props;
        if(this.state.filterType === 'type'){
            pokemonsWithSelectedTypeRequest(this.state.typeName)
        }else{
            pokemonRequest({ name: this.state.name });
        }
    };

    state : {
        name: string
        typeName: string
        filterType: string
    };
    
    constructor(props: Props) {
        super(props);
        this.state = {
            typeName: 'normal',
            name: '',
            filterType: 'type'
        };
    }


    render(): ReactNode{
        const { types } = this.props;
        return(
            <div className="Filter">
                <label>Selecione o tipo de busca:
                    <select value={this.state.filterType} onChange={e => this.setState({filterType: e.target.value})} >
                       <option value={'type'}>Tipo</option>
                       <option value={'name'}>Nome</option>
                    </select>
                </label>
                <br/>
                <div className="FiltersInput">
                    {this.state.filterType === 'name'?
                        <input placeholder="Nome do pokémon" onChange={(e)=>{ this.setState({ name: e.target.value})}}/>
                        :
                        <label>Selecione o tipo:
                            <select value={this.state.name} onChange={e => this.setState({typeName: e.target.value})} >
                                {types.map((type)=>{
                                    return <option value={type.name}>{type.name}</option>
                                })}
                            </select>
                        </label>
                        }
                </div>
                <Button onClick={this.handleSubmitType} label='Pesquisar'/>
                <Button onClick={this.handleCleanFilter} label='Limpar'/>
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    types: state.pokemons.typeList,
    offset: state.pokemons.offset,
    limit: state.pokemons.limit,
})


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(PokemonsActions, dispatch) 

export default connect(mapStateToProps, mapDispatchToProps)(Filter)