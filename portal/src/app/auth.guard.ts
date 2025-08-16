import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkAuthentication(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkAuthentication(state.url);
  }

  private checkAuthentication(redirectUrl: string): boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (!token) {
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: redirectUrl } });
    }

    try {
      const payloadPart = token.split('.')[1];
      if (!payloadPart) {
        localStorage.removeItem('token');
        return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: redirectUrl, reason: 'invalid' } });
      }
      const payload = JSON.parse(atob(payloadPart));
      const expSeconds = typeof payload.exp === 'number' ? payload.exp : NaN;
      if (!expSeconds || expSeconds * 1000 <= Date.now()) {
        localStorage.removeItem('token');
        return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: redirectUrl, reason: 'expired' } });
      }
      return true;
    } catch (_e) {
      localStorage.removeItem('token');
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: redirectUrl, reason: 'invalid' } });
    }
  }
}