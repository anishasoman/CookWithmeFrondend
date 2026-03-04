import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Apiservices {
  // baseurl: string = 'http://localhost:3000';
  baseurl: string = 'https://cookwithmebackend.onrender.com';
  constructor(private http: HttpClient) {}
  //for get images
  getImageUrl(filename: string) {
    return filename
      ? `${this.baseurl}/uploads/${filename}`
      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  }

  getRecipeAPI() {
    return this.http.get(`${this.baseurl}/api/allRecipes`);
  }

  regUsers(reqbody: any) {
    return this.http.post(`${this.baseurl}/api/registration`, reqbody);
  }

  loginUser(reqbody: any) {
    return this.http.post(`${this.baseurl}/api/login`, reqbody);
  }
  // to append token
  appendToken() {
    let headers = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }
  viewRecipeAPI(id: any) {
    return this.http.get(`${this.baseurl}/api/viewRecipe/${id}`, this.appendToken());
  }
  getRelatedRecipesAPI(cuisine: any) {
    return this.http.get(
      `${this.baseurl}/api/relatedRecipes?cuisine=${cuisine}`,
      this.appendToken(),
    );
  }

  // Save Recipe
  saveRecipeAPI(id: string, reqbody: any) {
    return this.http.post(`${this.baseurl}/api/saved/${id}`, reqbody, this.appendToken());
  }
  // Get Saved Recipes
  getSavedRecipesAPI() {
    return this.http.get(`${this.baseurl}/api/saved`, this.appendToken());
  }

  deleteSavedRecipeAPI(id: string) {
    return this.http.delete(`${this.baseurl}/api/saved/${id}`, this.appendToken());
  }
  addDownloadAPI(id: any, reqbody: any) {
    return this.http.post(`${this.baseurl}/api/addDownloaded/${id}`, reqbody, this.appendToken());
  }
  getDownloadAPI() {
    return this.http.get(`${this.baseurl}/api/getDownloads`, this.appendToken());
  }
  deleteDownloadAPI(id: any) {
    return this.http.delete(`${this.baseurl}/api/download/${id}`, this.appendToken());
  }

  updateProfileAPI(reqbody: any) {
    return this.http.put(`${this.baseurl}/api/update-profile`, reqbody, this.appendToken());
  }

  getProfileAPI() {
    return this.http.get(`${this.baseurl}/api/get-profile`, this.appendToken());
  }
  getAllUsersAPI() {
    return this.http.get(`${this.baseurl}/api/getUsers`);
  }
  getAllDownloadsAPI() {
    return this.http.get(`${this.baseurl}/api/downloads`);
  }
  addFeedbackAPI(reqbody: any) {
    return this.http.post(`${this.baseurl}/api/add-feedback`, reqbody, this.appendToken());
  }
  getFeedbacksAPI() {
    return this.http.get(`${this.baseurl}/api/get-feedbacks`);
  }
  updateStatusAPI(id: string, reqbody: any) {
    return this.http.put(`${this.baseurl}/api/feedback/${id}`, reqbody);
  }
  getApprovedFeedbacksAPI() {
    return this.http.get(`${this.baseurl}/api/feedback/approved`);
  }
  addRecipeAPI(reqbody: any) {
    return this.http.post(`${this.baseurl}/api/addRecipe`, reqbody);
  }
  deleteRecipeAPI(id: string) {
    return this.http.delete(`${this.baseurl}/api/deleteRecipe/${id}`);
  }
  updateRecipeAPI(id: string, reqbody: any) {
    return this.http.put(`${this.baseurl}/api/updateRecipe/${id}`, reqbody);
  }
}
