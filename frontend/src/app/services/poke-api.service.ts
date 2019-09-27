import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import urljoin from 'url-join';

// import { UtilService } from '../util/util.service';
import { environment as env } from '../../environments/environment';
import { forkJoin } from 'rxjs';
import { Pokedex } from '../intefaces';


@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  pokedexUrl = `pokemon`;

  constructor(
    private http: HttpClient
  ) {}

  getPokedex() {
    const url = urljoin(env.pokeApiUrl + this.pokedexUrl, `/?limit=${ env.pokedexLimit }`);
    const service = this.http.get(url);
    return service.toPromise();
  }

  getPokemonsInfoByPokedex(pokedex: Pokedex[]) {
    const requestArray = pokedex.map((pokemon) => this.getPokemonByUrl(pokemon.url));
    return forkJoin(requestArray).toPromise();
  }

  getInfoByUrl(url: string) {
    const service = this.http.get(url);
    return service.toPromise();
  }

  private getPokemonByUrl(pokemonUrl: string) {
    const service = this.http.get(pokemonUrl);
    return service;
  }

}
