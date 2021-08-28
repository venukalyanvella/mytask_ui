import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;

  constructor(private _auth:AuthService, private _router:Router,private toaster:ToastrManager) { }

  ngOnInit() {

    this.signupForm = new FormGroup({
      fullname:new FormControl('',[Validators.required]),
      username:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,]),
      password:new FormControl('',[Validators.required,Validators.minLength(4)]),
      mobile:new FormControl('',[Validators.required,Validators.minLength(10)]),
      address:new FormControl('',[Validators.required]),
      role:new FormControl('',[Validators.required]),
    })

  }

  onSubmit()
{
  console.log(this.signupForm.value);
  
  this._auth.signupUser(this.signupForm.value).subscribe(
    (result:any)=>{
      if(result['success']== 'true'){
        this._router.navigateByUrl('/login');
        this.toaster.successToastr(result.message, 'Success!')
      }
    },
    (error)=>{
      console.log(error);
      this.toaster.errorToastr(error.message,'Error')
    }
  )
}
}
