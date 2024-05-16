import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Use `!` to assure TypeScript that it will be initialized.
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    this.login();  // Call login when form submits
  }
  login(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.userService.login(email, password).subscribe(result => {
      if (result) {
        this.router.navigate(['/dashboard-admin']);
      } else {
        alert('Login failed');
      }
    }, error => {
      alert('Login failed');
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
