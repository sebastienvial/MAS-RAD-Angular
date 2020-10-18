import { Component } from '@angular/core';
import { AuthService } from './security/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  // title = 'SV Citizen Engagement';
  access: boolean = false;

  constructor (authService: AuthService) {
    authService.isAuthenticated().subscribe({
      next:(res) => {
        this.access = res;
      }
    })

  }  

}


