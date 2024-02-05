import { Reducer } from "@reduxjs/toolkit";
import { Pokemon, PokemonState, PokemonsTypes, loadSuccess } from "./types";

const INITIAL_STATE: PokemonState = {
    results: [],
    error: false,
    loading: false,
    count: 0,
    offset: 0,
    limit: 10,
    typeList: [],
    modeType: false,
    sprites: {front_default: ''},
    loadingGetPokemon: false,
    name: "",
    imageUrl: "",
    types: [],
    abilities: [],
    stats: [],
}

const reducer: Reducer<PokemonState> = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case PokemonsTypes.LOAD_REQUEST:
            return { ...state, loading: true}
        case PokemonsTypes.LOAD_SUCCESS:
            const resultLoadRequest = action.payload as loadSuccess
            const { results, count } = resultLoadRequest.pokemonInfos;
            return { ...state, loading: false, error: false, results, count, offset: resultLoadRequest.offset}
        case PokemonsTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: []}
        
            
        case PokemonsTypes.POKEMONS_WITH_SELECTED_TYPE_REQUEST:
            return { ...state, loading: true}
            case PokemonsTypes.POKEMONS_WITH_SELECTED_TYPE_SUCCESS:
            const {pokemonInfos} = action.payload as {pokemonInfos: Pokemon[]}
            return { ...state, loading: false, error: false, results: pokemonInfos, count: pokemonInfos.length, offset: 0}
        case PokemonsTypes.POKEMONS_WITH_SELECTED_TYPE_FAILURE:
            return { ...state, loading: false, error: true, data: []}

        case PokemonsTypes.POKEMON_REQUEST:
            return { ...state, loading: true };
        case PokemonsTypes.POKEMON_SUCCESS:
          const { name, imageUrl, types, abilities, stats } =
            action.payload as PokemonState;
            return {
                ...state,
                loading: false,
                error: false,
                name,
                imageUrl,
                types,
                abilities,
                stats,
            };
        case PokemonsTypes.POKEMON_FAILURE:
          return {
            ...state,
            loading: false,
            error: true,
            name: "",
            imageUrl: "",
            types: [],
            abilities: [],
            stats: [],
          };

          case PokemonsTypes.TYPES_REQUEST:
      return { ...state, loading: true };

    case PokemonsTypes.TYPES_SUCCESS:
      const { typeList } = (action.payload as any).data;

      return {
        ...state,
        loading: false,
        error: false,
        typeList,
      };

    case PokemonsTypes.TYPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        typeList: [],
      };
        default: 
            return state;
    }
}

export default reducer;