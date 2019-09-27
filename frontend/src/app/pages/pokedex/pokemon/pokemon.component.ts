import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon, PokemonSpecies } from 'src/app/intefaces';
import { PokeApiService } from '../../../services';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Output() clickPokemon = new EventEmitter();
  
  evolvesFrom: string;
  constructor(private pokeApi: PokeApiService) { }

  ngOnInit() {
    this.getPokemonEvolvesFrom();
  }

  getPokemonEvolvesFrom() {
    this.pokeApi.getInfoByUrl(this.pokemon.species.url).then((res: PokemonSpecies) => {
      if (res.evolves_from_species) {
        this.evolvesFrom = res.evolves_from_species.name;
      } else {
        this.evolvesFrom = 'Ninguno';
      }
    });
  }

  onClick(pokemonId: number) {
    this.clickPokemon.emit(pokemonId);
  }

}
