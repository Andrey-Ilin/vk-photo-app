import { Component } from '@angular/core';
import { Auth } from './services/authService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: []
})
export class AppComponent  {
  constructor(private auth: Auth) {}
}
