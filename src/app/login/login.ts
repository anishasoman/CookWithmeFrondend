import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apiservices } from '../services/apiservices';
@Component({
  selector: 'app-login',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: Apiservices,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {

      const { email, password } = this.loginForm.value;

      this.api.loginUser({ email, password }).subscribe({
        next: (res: any) => {
          if (res.success) {
          // store token in sessionStorage
          sessionStorage.setItem('token', res.token);

          //  store user info
          sessionStorage.setItem('user', JSON.stringify(res.user));
            alert(res.message);
            // console.log(res.user);
            if(res.user.role=='Admin'){
              this.router.navigateByUrl('/admin');
            }
            else{
            this.router.navigateByUrl('/');
            }
          }
        },
        error: (err) => {
          alert(err.error?.message || 'Login failed');
        }
      });

    } else {
      alert('Please fill all fields');
    }
  }
}
