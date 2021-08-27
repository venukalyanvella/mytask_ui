import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public role:any = sessionStorage.getItem('role');

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
this.router.navigateByUrl('/login')
  }

}
