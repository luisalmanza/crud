import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getContacts(page: number) {
    return this.http.get(`https://reqres.in/api/users?page=${page}`);
  }

  getContact(id: number) {
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }

  postContact(contact: Object) {
    return this.http.post('https://reqres.in/api/users', contact);
  }

  deleteContact(id: number) {
    return this.http.delete(`https://reqres.in/api/users/${id}`);
  }

  putContact(id: number, contact: Object) {
    return this.http.put(`https://reqres.in/api/users/${id}`, contact);
  }
}
