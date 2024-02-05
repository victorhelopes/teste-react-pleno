import { all, takeLatest } from 'redux-saga/effects'

import { PokemonsTypes } from './pokemons/types'
import { load, getPokemon, getTypes, getPokemonsWithType } from './pokemons/sagas';

export default function* rootSaga(): Generator{
    return yield all([
        takeLatest(PokemonsTypes.LOAD_REQUEST, load),
        takeLatest(PokemonsTypes.POKEMON_REQUEST, getPokemon),
        takeLatest(PokemonsTypes.TYPES_REQUEST, getTypes),
        takeLatest(PokemonsTypes.POKEMONS_WITH_SELECTED_TYPE_REQUEST, getPokemonsWithType),
    ]);
}