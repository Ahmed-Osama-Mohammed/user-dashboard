import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<{ data: User[] }> {
    return this.http.get<{ data: User[] }>(`${this.apiUrl}?page=${page}`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }


  getUserDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
