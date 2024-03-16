import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginPageRouting } from './login-page-routing.module';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button' ;
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [NavBarComponent,MatToolbarModule,MatButtonModule,FormsModule, CommonModule,HttpClientModule,LoginPageRouting,CommonModule,ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatIconModule],
   exports: [LoginComponent,RegisterComponent]
   
   
})
export class LoginPageModule { }
