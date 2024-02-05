import { action } from "typesafe-actions";
import { Pokemon, PokemonsTypes } from "./types";

//Get a pokemons
export const loadRequest = (data: any) => action(PokemonsTypes.LOAD_REQUEST, {data});

export const loadSuccess = (data: Pokemon[], offset: number) => action(PokemonsTypes.LOAD_SUCCESS, {pokemonInfos: data, offset: offset});

export const loadFailure = () => action(PokemonsTypes.LOAD_FAILURE);

//Get a pokemon informations
export const pokemonRequest = (data: any) => action(PokemonsTypes.POKEMON_REQUEST, { data });

export const pokemonSuccess = (data: any) => action(PokemonsTypes.POKEMON_SUCCESS, data);

export const pokemonFailure = () => action(PokemonsTypes.POKEMON_FAILURE);

//Get types
export const typesRequest = () => action(PokemonsTypes.TYPES_REQUEST);

export const typesSuccess = (data: any) => action(PokemonsTypes.TYPES_SUCCESS, { data });

export const typesFailure = () => action(PokemonsTypes.TYPES_FAILURE);

//Get pokemons type
export const pokemonsWithSelectedTypeRequest = (data: any) => action(PokemonsTypes.POKEMONS_WITH_SELECTED_TYPE_REQUEST, { data });

export const pokemonsWithSelectedTypeSuccess = (data: Pokemon[]) => action(PokemonsTypes.POKEMONS_WITH_SELECTED_TYPE_SUCCESS, { pokemonInfos: data });

export const pokemonsWithSelectedTypeFailure = () => action(PokemonsTypes.POKEMONS_WITH_SELECTED_TYPE_FAILURE);
