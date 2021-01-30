import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Router, ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  myForm: FormGroup = this.createForm()
  paisList: string[] = []
  @ViewChild('paisFabricacion', {static: true}) paisFab: ElementRef
  id: any = this._activateRouter.snapshot.paramMap.get('id')

  constructor(
    private _builder: FormBuilder,
    private _productoService: ProductoService,
    private _router: Router,
    private _activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPaises()
    this.setForm()
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

  setForm(){
    let x = this._productoService.getOneProducto(this.id)[0]
    this.myForm.setValue(
      {
        caracteristicas: x.caracteristicas,
        correoFabricante: x.correoFabricante,
        fecha: x.fecha,
        imagen: `${x.imagen}`,
        nombre: x.nombre,
        paisFabricacion: x.paisFabricacion,
        precio: x.precio,
        unidadesDisponibles: x.unidadesDisponibles,
        unidadesVendidas: x.unidadesVendidas
      }
    )   
    setTimeout(() => {
      this.setPaisFabricacion(x.paisFabricacion)
    },1000)
    
  }

  setPaisFabricacion(pais: any){
    let selectList = document.getElementsByTagName("option")
    for (let i = 0; i < selectList.length; i++) {    
        if (selectList[i].value === pais) {
            selectList[i].selected = true
            break
        }
    }
  }

  editarProducto(){
    if(!this.myForm.value) return
    let paisFabricacion = this.paisFab.nativeElement.value
    let producto:Producto = this.myForm.value
    producto.paisFabricacion = paisFabricacion
    producto.id = this.id
    this._productoService.editProducto(producto)
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
