import { Injectable } from '@angular/core';

import urljoin from 'url-join';

import { Pokemon } from 'src/app/intefaces';

import { ApiService } from './api.service';
import { forkJoin } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonUrl = 'pokemon';
  pokemonsUrl = 'pokemons';
  pokemonsByNameUrl = 'pokemon/name';
  token: string;
  headers: any;

  constructor(
    private api: ApiService,
  ) {
    this.token = localStorage.getItem('token');
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    };
  }

  // Method HTTP for get a list of Pathologies
  getPokemons() {
    const service = this.api.get(this.pokemonsUrl, null, {
      headers: this.headers
    });
    return service.toPromise();
  }

  getPokemon(pokemonId: string) {
    const url = urljoin(this.pokemonUrl, pokemonId);
    const service = this.api.get(url, null, { headers: this.headers });
    return service.toPromise();
  }

  getPokemonsByNames(pokemonsNames: string[]) {
    const requestArray = pokemonsNames.map((name) => this.getPokemonByName(name));
    return forkJoin(requestArray).toPromise();
  }

  createPokemons(pokemons: Pokemon[]) {
    const requestArray = pokemons.map((pokemon) => this.savePokemon(pokemon));
    return forkJoin(requestArray).toPromise();
  }
  
  private getPokemonByName(name: string) {
    const url = urljoin(this.pokemonsByNameUrl, name);
    const service = this.api.get(url, null, { headers: this.headers });
    return service;
  }

  private savePokemon(pokemon: Pokemon) {
    const body = {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities,
      sprites: pokemon.sprites,
      species: pokemon.species,
      types: pokemon.types
    };
    const service = this.api.post(this.pokemonUrl, body, {
      headers: this.headers
    });
    return service;
  }
}
