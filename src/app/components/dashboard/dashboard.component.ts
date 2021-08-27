import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(public _userService:UserService) { }

  ngOnInit() {
    this.getalluserDetails();
    this.userForm = new FormGroup({
      firstname:new FormControl(''),
      lastname:new FormControl(''),
      username:new FormControl(''),
      email:new FormControl(''),
      mobile:new FormControl(''),
      designation:new FormControl(),
      address:new FormControl('')

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
        (result)=>{
          console.log('User Details Updated');
          this.getalluserDetails();
          this.closeModel()
        },
        (error)=>{
          console.log('Failed to Update users Api Error',error)
          this.getalluserDetails();
          this.closeModel()

        }
      )
    } else {
     
      this._userService.newUser(data).subscribe(
        (result)=>{
          console.log('User Added');
          this.getalluserDetails();
          this.closeModel();
          this.resetAll()
          
        },
        (error)=>{
          console.log('Failed to Add Users Api Error',error)
          this.getalluserDetails();
          this.resetAll()

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
        (result)=>{
          console.log('User Removed Successfully');
          this.getalluserDetails();
        },
        (error)=>{
          console.log('Failed to Remove users Api Error',error)
        }
      )
    } else {
      this.getalluserDetails();

    }
  }


}
