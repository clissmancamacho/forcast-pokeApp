import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokedexComponent } from './pokedex.component';
import { AuthGuardService as AuthGuard } from '../../services';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PokedexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pokemon-detail/:id',
    component: PokemonDetailComponent,
    data: { animation: 'fader' },
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexRoutingModule {}
