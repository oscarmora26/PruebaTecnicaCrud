import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user = {}
  @ViewChild('foto', {static: true}) foto: ElementRef

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  logOut(){
    localStorage.setItem('user', null)
    this._router.navigate(['/login'])
  }

  getUser(){
    this.user = this._authService.getUser()    
  }

  subirFoto(){
    let user = this._authService.getUser()
    user.foto = this.foto.nativeElement.value
    this._authService.register(user)
    this.foto.nativeElement.value = ''
    this.user = this._authService.getUser()
  }

}
