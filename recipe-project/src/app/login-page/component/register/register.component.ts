import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../user.service';
import { User } from '../../../../entities/user.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    hide = true;
    loginError: string = '';
    userList?: User[];
    currentUser?: User;
    registerForm!: FormGroup;
    count: number = 0; 

    constructor(
        private router: Router,
        private _userService: UserService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            id: [this.count + 1], // Initialize Code to the nextUserCode + 1
            name: ['', Validators.required],
            password: ['', [Validators.required]],
            address: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });

        this.registerForm.value.name = this.route.snapshot.queryParams['username'];

        if (this.registerForm.value.name) {
            console.log('comming',this.registerForm.value.name)
            this.registerForm.get('name')!.setValue(this.registerForm.value.name);
        }

        this._userService.getUsers().subscribe({
            next: (res) => {
                this.userList = res;
                this.count = this.userList.length; // Set nextUserCode to the size of the array

            },
            error: (err) => {
                console.log(err);
            },
            complete: () => {
                console.log('Finish');
            }
        });
    }

    onSubmit() {
        const newUser = this.registerForm.value as User;
    
        this.currentUser = this.userList?.find(u => u.name === newUser.name); // Check for existing user
    
        if (this.currentUser) {
          this.loginError = "משתמש קיים במערכת";
        } else {
            const newUser = { ...this.registerForm.value, id: this.count };
            this._userService.addUser(newUser).subscribe({
             next: (res) => {
              console.log("Registration successful");
              this.router.navigate(['/recipe']);
              sessionStorage.setItem('name', newUser.name);
              sessionStorage.setItem('password', newUser.password); 
              sessionStorage.setItem('id', newUser.id); 
            },
            error: (err) => {
              console.error('Registration failed:', err);
              this.loginError = 'Registration failed. Please try again.';
            }
          });
        }
      }
}
