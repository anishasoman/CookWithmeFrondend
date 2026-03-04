import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apiservices } from '../../services/apiservices';
import { Sidebar } from "../sidebar/sidebar";
@Component({
  selector: 'app-download-list',
  imports: [CommonModule,Sidebar],
  templateUrl: './download-list.html',
  styleUrl: './download-list.css',
})
export class DownloadList implements OnInit {

  downloads: any = [];

  constructor(private api:Apiservices) {}

  ngOnInit(): void {
    this.getDownloads();
  }

  getDownloads() {
    this.api.getAllDownloadsAPI().subscribe({
      next: (res:any) => {
        console.log(res);
        
          this.downloads = res;
        
      },
      error:(err:any)=>{
        console.log("Error fetching downloads", +err);
      }
    });
  }
}
