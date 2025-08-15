import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) {}

  // Método temporal para simular login
  onLogin() {
    // Aquí iría la lógica de autenticación real
    this.router.navigate(['/dashboard']);
  }
}
