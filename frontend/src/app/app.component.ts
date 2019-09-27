import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { fader } from './route-animations';

@Component({
  selector: 'app-root',
  animations: [
    fader
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pokeApp';
  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.ifLoggedIn();
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('pokedex');
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
