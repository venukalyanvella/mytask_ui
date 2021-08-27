import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public api_url = `http://localhost:3000/api`
  constructor( private _http:HttpClient) { }

  // get all Users
  getAllUsers(data:any){
    return this._http.post(this.api_url+`${'/user/allusers'}`,data)
    
  }

  changeDetails(data:any,id:any){
    return this._http.put(this.api_url+`${'/user/chuser/'}${id}`,data)
  }

  removeuser(id:any){
    return this._http.delete(this.api_url+`${'/user/rmuser/'}${id}`)
  }

  newUser(data:any){
    return this._http.post(this.api_url+`${'/user/adduser'}`,data)
  }

}
