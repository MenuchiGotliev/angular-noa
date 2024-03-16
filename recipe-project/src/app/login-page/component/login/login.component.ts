import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from '../../../user.service';
import { User } from '../../../../entities/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users?: User[];
  username?: string = '';
  password?: string = '';
  hide = true;
  userExists?:User;
  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUsers().subscribe(users => {
      this.users = users;
      console.log("users: ", users);
    });
  }

  login() {
     this.userExists = this.users?.find(user => user.name === this.username);

    if ( this.userExists) {
      if ( this.userExists.password !== this.password) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "the password is not good",
        });
      } else {
        this.currentUserDetails()
        this.router.navigate(['/recipe']);
      }
    } else {
      // אם המשתמש אינו קיים, ננווט לדף הרישום
      const navigationExtras: NavigationExtras = {
        state: {
          username: this.username
        }
      };
      this.router.navigate(['/login/register'], navigationExtras);
    }
  }

  currentUserDetails() {
    sessionStorage.setItem('id',(this.userExists.id).toString()); 
    sessionStorage.setItem('name', this.username);
    sessionStorage.setItem('password', this.password);
    console.log(localStorage.getItem('password'))

  }
}
