import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './login/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  private loggedInSource = new BehaviorSubject<boolean>(false);
  private emailSource = new BehaviorSubject<string>('');

  isLoggedIn = this.loggedInSource.asObservable();
  email = this.emailSource.asObservable();

  constructor(private http: HttpClient) {}

  getEmail(): Observable<string> {
    return this.emailSource.asObservable(); // Correctly returning the observable from the BehaviorSubject
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.loggedInSource.next(true);
          this.emailSource.next(email);
          return user;
        } else {
          this.loggedInSource.next(false);
          this.emailSource.next('');
          return null;
        }
      })
    );
  }
  

  logout(): void {
    this.loggedInSource.next(false);
    this.emailSource.next('');
  }

  register(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, { email, password });
  }
}
