import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public api_url = `http://localhost:3000/api`
  constructor( private _http:HttpClient) { }

  signupUser(data:any){
    return this._http.post<any>(this.api_url+`${'/register'}`,data)
  }

  userLogin(data:any){
     return this._http.post<any>(this.api_url+`${'/login'}`,data)
  }

  updateChanges(data:any,id:any){
    return this._http.put(this.api_url+`${'/chprofile/'}${id}`,data)
  }


  getToken(){
    return sessionStorage.getItem('token');
  }
  
  removeToken(){
    sessionStorage.removeItem('token');
    window.sessionStorage.clear();
  }
  
  getuserDetails(){
    const token = this.getToken();
    if(token){
      let payload = window.atob(token.split('.')[1])
      
      return JSON.parse(payload)
    }
  }
  
  isLoggedIn():boolean
  {
    const user = this.getuserDetails();
    if(user){
      sessionStorage.setItem('exp',user.exp);
      sessionStorage.setItem('iat',user.iat)
      user.exp >Date.now() 
      return true
  
    } else {
      return false
    }
  
  
  }

}
