import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService, PokeApiService } from 'src/app/services';
import { Pokemon, PokemonSpecies, PokemonEvolutionChain } from 'src/app/intefaces';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon;
  pokemonsEvolutions: Pokemon[] = [];
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private pokeApi: PokeApiService,
    private router: Router
    ) { }

  ngOnInit() {
    const pokemonId = this.route.snapshot.params.id;
    this.getPokemonInfo(pokemonId);
  }

  getPokemonInfo(pokemonId) {
    this.pokemonService.getPokemon(pokemonId).then((res: any) => {
      if(res.status === 1) {
        this.pokemon = res.pokemon;
        this.pokeApi.getInfoByUrl(this.pokemon.species.url).then((res: PokemonSpecies) => {
        this.pokeApi.getInfoByUrl(res.evolution_chain.url)
          .then((res: PokemonEvolutionChain) => {
            const evolutionArray = this.createEvolutionArray(res);
            this.pokemonService.getPokemonsByNames(evolutionArray)
              .then((res: any[]) => {
                res.map(item => {
                  this.pokemonsEvolutions.push(item.pokemon);
                });
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }

  createEvolutionArray(data) {
    const evolutionChain = [];
    evolutionChain.push(data.chain.species.name);
    const evolvesToArray = data.chain.evolves_to;

    evolvesToArray.map(element => {
      evolutionChain.push(element.species.name);
      element.evolves_to.map(item => {
        evolutionChain.push(item.species.name);
      });
    });
    return evolutionChain;
  }

  back(){
    this.router.navigateByUrl("pokedex");
  }


}
