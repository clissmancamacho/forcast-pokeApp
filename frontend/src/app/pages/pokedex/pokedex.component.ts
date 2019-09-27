import { Component, OnInit } from '@angular/core';

import { Pokedex, Pokemon } from '../../intefaces';

import { PokeApiService, PokemonService } from '../../services';
import { pokemons } from 'src/assets/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokemons: Pokemon[] = pokemons;
  displayGrid = false;
  searchTerm = '';
  gridColumns: any[] = [];
  gridRows: any[] = [];
  userRol: string;

  constructor(
    private router: Router,
    private pokeApi: PokeApiService, 
    private pokemonService: PokemonService,
    ) { }

  async ngOnInit() {
    this.userRol =  JSON.parse( localStorage.getItem("user")).rol;

    await this.getPokedexAndSavePokemons();
    await this.buildGridRowsAndColumns();
  }

  getPokedexAndSavePokemons() {
     this.pokeApi.getPokedex().then((res: any) => {
      const pokedex: Pokedex[] = res.results;
      this.pokeApi.getPokemonsInfoByPokedex(pokedex).then((res: Pokemon[]) => {
        this.pokemons = res;
        this.savePokemons(res);
      });
    });
  }

  savePokemons(pokemons: Pokemon[]) {
    this.pokemonService.getPokemons().then((res: any) => {
      if (res.status === 1){
        if(res.pokemons.length > 0){
          return;
        } else {
          this.pokemonService.createPokemons(pokemons)
        }
      }
    })
  }

  listenToClickPokemon(pokemonId: number) {
    this.router.navigateByUrl(`pokedex/pokemon-detail/${pokemonId}`);
  }

  changeDisplayGrid() {
    this.displayGrid = !this.displayGrid;
  }

  buildGridRowsAndColumns() {
    this.gridColumns = [
      { headerName: 'Id/Número', field: 'id' , sortable: true, filter: true },
      { headerName: 'Nombre', field: 'name' , sortable: true, filter: true },
      { headerName: 'Tipos', field: 'types', sortable: true, filter: true },
      { headerName: 'Habilidades', field: 'abilities', sortable: true, filter: true },
      { headerName: 'Altura', field: 'height', sortable: true, filter: true },
      { headerName: 'Peso', field: 'weight', sortable: true, filter: true },
    ];
    this.pokemons.map((pokemon: Pokemon) => {
      const { id, name, height, weight } = pokemon;
      let typesArray = [];
      let abilitiesArray = [];

      pokemon.types.map(typeInfo => {
        typesArray.push(typeInfo.type.name);
      });

      pokemon.abilities.map(abilityInfo => {
        abilitiesArray.push(abilityInfo.ability.name);
      });

      const types = typesArray.join(' - ');
      const abilities = abilitiesArray.join(' - ');

      this.gridRows.push({
        id,
        name,
        types,
        abilities,
        height,
        weight
      });
    });
  }
}
