import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private router: Router, 
    private auth: AuthenticationService, 
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    // Resetear mensajes
    this.clearMessages();
    
    // Validar formulario
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    const { username, password } = this.loginForm.value;
    this.isLoading = true;
    this.auth.attemptLogin(username, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response && response?.token) {
          const token = response.token;
          
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
      
            sessionStorage.setItem('username', payload.username);
            sessionStorage.setItem('roles', JSON.stringify(payload.authorities));
           
            localStorage.setItem('token', token);
            
            this.successMessage = 'Inicio de sesión exitoso. Redirigiendo...';
            
            // Pequeño delay para mostrar el mensaje de éxito
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1000);
            
          } catch (error) {
            console.error('Error decoding token:', error);
            this.errorMessage = 'Error en el formato del token. Contacta al administrador.';
          }
        } else {
          this.errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        
        // Manejo de errores más específico
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
        } else if (error.status === 403) {
          this.errorMessage = 'Acceso denegado. Tu cuenta puede estar desactivada.';
        } else if (error.status === 0) {
          this.errorMessage = 'No se puede conectar al servidor. Verifica tu conexión.';
        } else if (error.status >= 500) {
          this.errorMessage = 'Error del servidor. Intenta nuevamente en unos minutos.';
        } else {
          this.errorMessage = 'Error inesperado. Intenta nuevamente.';
        }
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getters para fácil acceso a los controles del formulario
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Métodos para verificar errores
  hasError(controlName: string, errorType: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? control.hasError(errorType) && control.touched : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    
    if (control?.hasError('required') && control.touched) {
      return controlName === 'username' ? 'El email es requerido' : 'La contraseña es requerida';
    }
    
    if (control?.hasError('email') && control.touched) {
      return 'Ingresa un email válido';
    }
    
    if (control?.hasError('minlength') && control.touched) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    
    return '';
  }
}
