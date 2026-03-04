import { Component, OnInit } from '@angular/core';
import { Router, RouterModule ,NavigationEnd} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {

  token: any = null;
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUser();

    // listen to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadUser();
      }
    });
  }

  loadUser() {
    this.token = sessionStorage.getItem('token');
    this.user = JSON.parse(sessionStorage.getItem('user') || 'null');
  }

  logout() {
    sessionStorage.clear();
    this.loadUser();
    this.router.navigate(['/login']);
  }
}
