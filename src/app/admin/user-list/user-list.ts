import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from "../sidebar/sidebar";
import { Apiservices } from '../../services/apiservices';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule,Sidebar,],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {

  users: any = [];

  constructor(public api: Apiservices) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.getAllUsersAPI().subscribe({
      next: (res) => {
        console.log(res);
        this.users=res
        
      },
      error: (err) => {
        console.log("Error fetching users", err);
      }
    });
  }
}
