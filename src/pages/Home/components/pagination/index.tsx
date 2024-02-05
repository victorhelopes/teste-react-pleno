import { Dispatch, bindActionCreators } from "@reduxjs/toolkit"
import { ApplicationState } from "../../../../store"

import * as PokemonsActions from '../../../../store/ducks/pokemons/actions'
import { connect } from "react-redux"
import { Component, ReactNode } from "react";

import './styles.css'
import { Button } from "../../../../components/Button";

interface StateProps {
    offset: number;
    limit: number;
    count: number
}

interface DispatchProps {
    loadRequest(data: { offset: number; limit: number }): void;
}

type Props = StateProps & DispatchProps

class Pagination extends Component<Props>{
    previousPagination = () =>{
        const {loadRequest, offset, limit } = this.props;
        if(offset !== 0)
            loadRequest({offset: offset - limit, limit: limit})
    }
    
    nextPagination = () =>{
        const {loadRequest, offset, limit, count } = this.props;
        if(offset+ limit < count)
            loadRequest({offset: offset+ limit, limit: limit})
    }
    
    render(): ReactNode{
        return(
        <div className="ButtonsPagination">
            <Button label="Anterior" onClick={()=>{this.previousPagination()}}/>
            <Button label="Próximo" onClick={()=>{this.nextPagination()}}/>
        </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    offset: state.pokemons.offset,
    limit: state.pokemons.limit,
    count: state.pokemons.count
})


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(PokemonsActions, dispatch) 

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)