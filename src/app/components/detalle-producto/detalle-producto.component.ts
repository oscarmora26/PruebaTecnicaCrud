import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  id: any = this._activateRouter.snapshot.paramMap.get('id')
  producto: Producto

  constructor(
    private _activateRouter: ActivatedRoute,
    private _productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.getOneProducto()
  }

  getOneProducto(){
    this.producto = this._productoService.getOneProducto(this.id)[0]    
  }
}
