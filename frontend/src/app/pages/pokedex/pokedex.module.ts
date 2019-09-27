import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from '../../app.material.module';
import { PipesModule } from '../../pipes/pipes.module';

import { PokedexRoutingModule } from './pokedex-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { PokemonComponent } from './pokemon/pokemon.component';
import { PokedexComponent } from './pokedex.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';


@NgModule({
  declarations: [PokedexComponent, PokemonComponent, PokemonDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    PipesModule,
    ComponentsModule,
    PokedexRoutingModule
  ]
})
export class PokedexModule { }
