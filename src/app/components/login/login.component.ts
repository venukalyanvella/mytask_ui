import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
user_role:any
  constructor( private _auth:AuthService, private _router:Router,private toaster:ToastrManager) { }

  ngOnInit() {
  
    this.loginForm = new FormGroup({
      username:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    })

  }
  loginUser(){
    console.log(this.loginForm.value);
    this._auth.userLogin(this.loginForm.value).subscribe(
      (result:any)=>{
        console.log(result.data.role);
        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('role', result.data.role)
       this.user_role = result.data.role;
       this.toaster.successToastr(result.message,"Success")

       if(this.user_role === 'user'){
          this._router.navigateByUrl('/home')
       }
else {
  this._router.navigateByUrl('/dashboard')
}
      },
      (error)=>{
        console.log(error);
        this.toaster.errorToastr(error.message,"Error")
      }
    )
  }

  



}


