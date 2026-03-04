import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apiservices } from '../services/apiservices';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  feedbackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: Apiservices
  ) {

    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      about: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  submitFeedback() {

    if (this.feedbackForm.invalid) return;

    this.api.addFeedbackAPI(this.feedbackForm.value)
      .subscribe({
        next: (res: any) => {
          alert(res.message || "Feedback Submitted Successfully");
          this.feedbackForm.reset();
        },
        error: (err) => {
          console.log(err);
          alert("Something went wrong");
        }
      });
  }
}
