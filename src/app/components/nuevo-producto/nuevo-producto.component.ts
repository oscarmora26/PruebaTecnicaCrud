import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  myForm: FormGroup = this.createForm()
  paisList: string[] = []
  @ViewChild('paisFabricacion', {static: true}) paisFab: ElementRef

  constructor(
    private _builder: FormBuilder,
    private _productoService: ProductoService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getPaises()
  }

  createForm(){
    return this._builder.group({
      nombre: ['', Validators.required],
      caracteristicas: ['', Validators.required],
      fecha: ['', Validators.required],
      correoFabricante: ['',[Validators.required, Validators.email]],
      paisFabricacion: [''],
      precio: ['', Validators.required],
      unidadesDisponibles: ['', Validators.required],
      unidadesVendidas: ['', Validators.required],
      imagen: ['', Validators.required]
    })
  }

  getPaises(){
    this._productoService.getPaise().subscribe((resp) => {
      let x = <any[]>resp
        x.forEach(pais => {
          this.paisList.push(pais['name'])
        });           
    })
  }

  crearProducto(){
    if(!this.myForm.value) return
    let paisFabricacion = this.paisFab.nativeElement.value
    let producto:Producto = this.myForm.value
    producto.paisFabricacion = paisFabricacion
    
    this._productoService.crearProducto(producto)
    this._router.navigate(['/home'])
  }
  cerrar(){
    Swal.fire({
      title: 'Esta seguro de cerrar',
      text: "Si cierra el fomulario la informacion se perdera!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo cerrar!',
      cancelButtonText: 'cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.myForm.reset()
        this._router.navigate(['/home'])
      }
    })
  }

  get nombre () {return this.myForm.get('nombre')}
  get caracteristicas () {return this.myForm.get('caracteristicas')}  
  get fecha () {return this.myForm.get('fecha')}
  get correoFabricante () {return this.myForm.get('correoFabricante')}
  get paisFabricacion () {return this.myForm.get('paisFabricacion')}
  get precio () {return this.myForm.get('precio')}
  get unidadesDisponibles () {return this.myForm.get('unidadesDisponibles')}
  get unidadesVendidas () {return this.myForm.get('unidadesVendidas')}
  get imagen () {return this.myForm.get('imagen')}

}
