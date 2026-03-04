import { Component } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { Calender } from "../calender/calender";
import { Graph } from "../graph/graph";

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, Calender, Graph],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
