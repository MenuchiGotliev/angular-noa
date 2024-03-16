import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  logoutbe?:boolean=false
  logout() {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('id');
  }
}