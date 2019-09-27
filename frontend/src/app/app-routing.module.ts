import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AuthGuardService as AuthGuard } from './services';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/signup',
    component: SignupComponent
  },
  {
    path: 'pokedex',
    loadChildren: './pages/pokedex/pokedex.module#PokedexModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
