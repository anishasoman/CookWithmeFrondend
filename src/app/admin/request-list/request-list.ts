import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apiservices } from '../../services/apiservices';
import { Sidebar } from '../sidebar/sidebar';
@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule,Sidebar],
  templateUrl: './request-list.html',
  styleUrl: './request-list.css',
})
export class RequestList implements OnInit {

  feedbacks: any = [];

  constructor(private api: Apiservices) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.api.getFeedbacksAPI().subscribe({
      next: (res: any) => {
        console.log(res);
        
        this.feedbacks = res.feedbacks;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

updateStatus(item: any, status: string) {
  this.api.updateStatusAPI(item._id, { status }).subscribe({
    next: () => {
      item.status = status;
    },
    error: (err) => console.log(err)
  });
}


}
