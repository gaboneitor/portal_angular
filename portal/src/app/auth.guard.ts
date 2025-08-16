import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { PropertiesService } from './services/properties.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private properties: PropertiesService) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      window.location.href = this.properties+'login';
      return false;
    }
    return true;
  }

}