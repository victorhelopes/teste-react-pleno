 //Action Types
export enum PokemonsTypes {
    LOAD_REQUEST = '@pokemons/LOAD_REQUEST',
    LOAD_SUCCESS = '@pokemons/LOAD_SUCCESS',
    LOAD_FAILURE = '@pokemons/LOAD_FAILURE',
    
    POKEMONS_WITH_SELECTED_TYPE_REQUEST = '@pokemons/POKEMONS_WITH_SELECTED_TYPE_REQUEST',
    POKEMONS_WITH_SELECTED_TYPE_SUCCESS = '@pokemons/POKEMONS_WITH_SELECTED_TYPE_SUCCESS',
    POKEMONS_WITH_SELECTED_TYPE_FAILURE = '@pokemons/POKEMONS_WITH_SELECTED_TYPE_FAILURE',
  
    POKEMON_REQUEST = '@pokemons/POKEMON_REQUEST',
    POKEMON_SUCCESS = '@pokemons/POKEMON_SUCCESS',
    POKEMON_FAILURE = '@pokemons/POKEMON_FAILURE',
  
    TYPES_REQUEST = '@pokemons/TYPES_REQUEST',
    TYPES_SUCCESS = '@pokemons/TYPES_SUCCESS',
    TYPES_FAILURE = '@pokemons/TYPES_FAILURE',
}
  
//Data Types
export interface Pokemon{
    url: string;
    name: string;
}
  
export interface TypeProps {
  name: string;
}

export interface StatisticProps {
  base_stat: string;
  stat: string;
}

export interface SpritesProps {
  front_default: string;
}

export interface loadSuccess {
  pokemonInfos: PokemonState;
  offset: number
}

//State type
export interface PokemonState {
  readonly results: Pokemon[];
  readonly error: boolean;
  readonly loading: boolean;
  readonly count: number;
  readonly offset: number;
  readonly limit: number;
  readonly sprites: SpritesProps;
  readonly typeList: TypeProps[];
  readonly modeType: boolean;
  readonly loadingGetPokemon: boolean;
  readonly name: string;
  readonly imageUrl: string;
  readonly types: string[];
  readonly abilities: string[];
  readonly stats: StatisticProps[];
}