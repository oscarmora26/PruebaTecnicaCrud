import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  myForm: FormGroup = this.createForm()

  constructor(
    private _builder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  createForm(){
    return this._builder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.min(8)]]
    })
  }    

  registrar(){
    if(!this.myForm.valid) return
    this._authService.register(this.myForm.value)
    this._router.navigate(['/login'])
  }

  get nombre () {return this.myForm.get('nombre')}
  get correo () {return this.myForm.get('correo')}
  get clave () {return this.myForm.get('clave')}

}
