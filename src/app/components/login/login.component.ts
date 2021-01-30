import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup = this.createForm()
  error:any

  constructor(
    private _builder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  createForm(){
    return this._builder.group({      
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.min(8)]]
    })
  }    

  logIn(){
    if(!this.myForm.valid) return

    let user = this._authService.getUser()

    if (user == null) {
      this.error = "Tiene que registrarse"
      setTimeout(() => this.error = '', 3000)
      return
    }

    if(user.correo == this.correo.value && user.clave == this.clave.value){
      this._router.navigate(['/home'])
    }else{
      this.error = "Correo o contraseña incorrectos"
      setTimeout(() => this.error = '', 3000)
    }
        
  }

  get correo () {return this.myForm.get('correo')}
  get clave () {return this.myForm.get('clave')}

}
