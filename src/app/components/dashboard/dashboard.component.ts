import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from 'src/app/services/user.service';
 declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public page:number=1;
  public limit:number=10;
  public UserDetails:any =[];
  title:any = 'Add'
  action:any = null;
  userForm:FormGroup;
  public user_id:any 
  constructor(public _userService:UserService,private toaster:ToastrManager) { }

  ngOnInit() {
    this.getalluserDetails();
    this.userForm = new FormGroup({
      firstname:new FormControl('',[Validators.required,Validators.minLength(3)]),
      lastname:new FormControl('',[Validators.required,Validators.minLength(3)]),
      username:new FormControl('',[Validators.required,Validators.minLength(3)]),
      email:new FormControl('',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]),
      mobile:new FormControl('',[Validators.required,Validators.minLength(10)]),
      designation:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required])

    })
  }

  getalluserDetails(){
    let payload ={
      page:this.page,
      limit:this.limit
    }
    this._userService.getAllUsers(payload).subscribe(
      (result:any)=>{
        console.log(result.data)
        this.UserDetails = result.data
      }
    ),
    (error:any)=>{
      console.log(error)
    }
  }

  submitDetails(data:any,action:any){
    console.log(data)

    if(this.action == 'update'){
      this._userService.changeDetails(data,this.user_id).subscribe(
        (result:any)=>{
          console.log('User Details Updated');
          this.getalluserDetails();
          this.closeModel()
          this.toaster.successToastr(result.message,'Updated')
        },
        (error:any)=>{
          console.log('Failed to Update users Api Error',error)
          this.getalluserDetails();
          this.closeModel()
          this.toaster.errorToastr(error.message,'Error')

        }
      )
    } else {
     
      this._userService.newUser(data).subscribe(
        (result:any)=>{
          console.log('User Added');
          this.getalluserDetails();
          this.closeModel();
          this.resetAll()
          this.toaster.successToastr(result.message,'Added')

          
        },
        (error:any)=>{
          console.log('Failed to Add Users Api Error',error)
          this.getalluserDetails();
          this.resetAll()
          this.toaster.errorToastr(error.message,'Error')
        }
      )

    }

  }

  // reset Form
  resetAll(){
    this.userForm.reset()
  }
  // Changes on user Details 
  makeChanges(item:any){
    this.title='Edit';
    this.openModel();
    this.user_id = item._id;
    console.log(item);
this.action = 'update';
this.userForm.patchValue({
firstname:item.firstname,
lastname:item.lastname,
username:item.username,
email:item.email,
mobile:item.mobile,
designation:item.designation,
address:item.address
})
    
  }

  openModel(){
    
    $('#myModal').modal('show')
  }
  closeModel(){
    $('#myModal').modal('hide')
  }
 
  
  // remove User 
  removeUser(data:any){
    if(confirm('Are Sure Want To Delete this User ??')){
      this._userService.removeuser(data).subscribe(
        (result:any)=>{
          console.log('User Removed Successfully');
          this.getalluserDetails();
          this.toaster.successToastr(result.message,'Deleted')
        },
        (error:any)=>{
          console.log('Failed to Remove users Api Error',error);
          this.toaster.errorToastr(error.message,'Error');

        }
      )
    } else {
      this.getalluserDetails();

    }
  }


}
