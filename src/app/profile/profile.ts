import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apiservices } from '../services/apiservices';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  username: string = '';
  email: string = '';
  profilePic: string = '';
  token: any = '';
  downloadedRecipes: any= [];
  selectedFile: File | null = null;  

  constructor(private api: Apiservices,private router: Router) {}

  ngOnInit(): void {
    this.getDownloads();
        this.token = sessionStorage.getItem('token');

    if (!this.token) {
      alert("Please login first");
      this.router.navigateByUrl('/login');
    }

    this.loadProfile();
    this.getDownloads();
  }

  // Load Downloaded Recipes
  getDownloads() {
    this.api.getDownloadAPI().subscribe({
      next: (res: any) => {
        this.downloadedRecipes = res.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }



deleteRecipe(recipe:any) {

  this.api.deleteDownloadAPI(recipe._id).subscribe({
    next: () => {

      // remove from UI instantly
      this.downloadedRecipes =
        this.downloadedRecipes.filter(
         (r: any) => r._id !== recipe._id
        );

      alert("Download removed");
    }
  });
}

  // Image select method
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // preview image instantly
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePic = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  loadProfile() {
    this.api.getProfileAPI().subscribe({
      next: (res: any) => {
        this.username = res.user.username;
        this.email = res.user.email;
        this.profilePic = res.user.profilePic;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

updateProfile() {
  const formData = new FormData();

  formData.append("username", this.username);
  formData.append("email", this.email);

  if (this.selectedFile) {
    formData.append("profilePic", this.selectedFile);
  }

  this.api.updateProfileAPI(formData).subscribe({
      next: () => {
        alert("Profile Updated Successfully");
        this.loadProfile();
      },
      error: () => {
        alert("Update Failed");
      }
    });
}
}
