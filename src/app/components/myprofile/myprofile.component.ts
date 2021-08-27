import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
declare var $:any;

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  userForm:FormGroup;
  public user_id:any;
 public myprofile:any =[]
  constructor(private _authservice:AuthService) { }

  ngOnInit() {
   this.getProfile()
   this.user_id = this.myprofile._id
   this.userForm = new FormGroup({
     fullname:new FormControl(''),
     username:new FormControl(''),
     email:new FormControl(''),
     mobile:new FormControl('')
   })
  //  console.log(this.myprofile)
  }

  getProfile(){
    this.myprofile= this._authservice.getuserDetails();
  }

  saveDetails(data:any){
this._authservice.updateChanges(data,this.user_id).subscribe(
  (result)=>{
    console.log('PRofile Updated');
    this.getProfile()
    this.closeModel()

  },
(error)=>{
  console.log('Failed to Update Profile',error)
  this.getProfile();
  this.closeModel()


}
)

  }
  openModel(){
    
    $('#myModal').modal('show');
    this.userForm.patchValue({
      fullname:this.myprofile.fullname,
      username:this.myprofile.username,
      email:this.myprofile.email,
      mobile:this.myprofile.mobile
    })
  }
  closeModel(){
    $('#myModal').modal('hide')
  }

}
