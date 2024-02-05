import { call, put } from 'redux-saga/effects';

import { api } from '../../../services';

import { loadFailure, loadSuccess, pokemonFailure, pokemonSuccess, pokemonsWithSelectedTypeFailure, pokemonsWithSelectedTypeSuccess, typesFailure, typesSuccess } from './actions';
import { Pokemon, PokemonState } from './types';

export function* load(data: any){
    const { offset, limit } = data.payload.data;
    try {
        const response: {data: Pokemon[]} = yield call(api.get, `/pokemon?offset=${offset}&limit=${limit}`)
        yield put(loadSuccess(response.data, offset))
    }catch(err) {
        yield put(loadFailure())
    }
}

export function* getPokemon(data?: any) {
    const { name } = data.payload.data;
  
    try {
      const response:  {data: PokemonState}  = yield call(api.get, `/pokemon/${name}`);
      
      const { abilities, types, sprites, stats } = response.data;
      const newAbilities = abilities.map((item: any) => item.ability.name);
      const newTypes = types.map((item: any) => item.type.name);
      const newStatsticsstatistics = stats.map((item: any) => {
        return { base_stat: item.base_stat, stat: item.stat.name };
      });

      const pokemonData = {
        name,
        imageUrl: sprites.front_default,
        abilities: newAbilities,
        types: newTypes,
        stats: newStatsticsstatistics,
      }; 
    
      yield put(pokemonSuccess(pokemonData));
    } catch (err) {
      yield put(pokemonFailure());
    }
  }

  export function* getTypes(): Generator {
    try {
      const response: any = yield call(api.get, "/type");
  
      const { results } = response.data;
  
      yield put(typesSuccess({ typeList: results }));
    } catch (err) {
      yield put(typesFailure());
    }
  }
  
  export function* getPokemonsWithType(data: any): Generator {
    const type = data.payload.data;
  
    try {
      const response: any = yield call(api.get, `/type/${type}`);

      const { pokemon: list } = response.data;
  
      const newList: Pokemon[] = list.map((item: any) => {
        return item.pokemon;
      });
  
      yield put(pokemonsWithSelectedTypeSuccess(newList));
    } catch (err) {
      yield put(pokemonsWithSelectedTypeFailure());
    }
  }