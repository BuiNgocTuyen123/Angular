import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPassword: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Tạo form group với tất cả validators và custom validator ở đây
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });  // Đảm bảo rằng checkPasswords được áp dụng ở đây
  }

  ngOnInit(): void {
    // Không cần thiết lập lại form group ở đây
  }
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value.email, this.registerForm.value.password).subscribe(
        () => this.router.navigate(['/login']),
        error => alert('There was an error during the registration process')
      );
    }
  }

  checkPasswords(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    // Check if both fields have the same value
    return password === confirmPassword ? null : { notSame: true };
  }
}
