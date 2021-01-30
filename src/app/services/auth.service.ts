import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  register(user){
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user'))
  }
}
