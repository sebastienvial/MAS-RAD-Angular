import { Component } from '@angular/core';
import { AuthService } from './security/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'SV citizen-engagement';
  access: boolean = false;

  constructor (authService: AuthService) {
    authService.isAuthenticated().subscribe({
      next:(res) => {
        this.access = res;
      }
    })

  }

}


