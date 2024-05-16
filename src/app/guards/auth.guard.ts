import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.getEmail().pipe(
      map(email => {
        if (email === 'admin@gmail.com') {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
  logout() {
    localStorage.removeItem('authToken'); // replace 'authToken' with your actual token key
  }
  
}
