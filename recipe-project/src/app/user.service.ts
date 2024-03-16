import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7137/api/User';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7137/api/User')
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`https://localhost:7137/api/User/${id}`)
  }


  addUser(user: User):Observable<User> {
    return this.http.post<User>(this.apiUrl, user)
  }
  

 
}

