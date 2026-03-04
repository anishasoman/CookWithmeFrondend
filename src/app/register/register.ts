import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { Apiservices } from '../services/apiservices';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: Apiservices,
    private route: Router
  ) {
    this.regForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.regForm.valid) {

      const {username,email,password } = this.regForm.value;

      console.log(username,email,password);

      this.api.regUsers({username,email,password}).subscribe({
        next: (res: any) => {
          console.log(res);

          if (res.success) {
            alert('Registration successful');
            this.route.navigateByUrl('login');
          }
        },
        error: (err) => {
          console.log(err);
          alert(err.error?.message || 'Registration failed');
        }
      });

    } else {
      alert('Please fill the form');
    }
  }
}

