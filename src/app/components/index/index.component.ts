import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  productosList: Producto[] = []
  @ViewChild('orderBy', {static: true}) orderBy: ElementRef
  @ViewChild('filter', {static: true}) filter: ElementRef
  @ViewChild('filterText', {static: true}) filterText: ElementRef
  pageActual: number = 1

  constructor(
    private _productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this._productoService.validateProductInLocalStorage()
    this.getProductos()
    this.filterChange()
  }

  getProductos(){
    this.productosList = this._productoService.getProductos()
  }

  deleteProducto(id){
    this._productoService.deleteProducto(id)
    this.getProductos()
  }

  orderChange(){
    let data = this.orderBy.nativeElement.value
    let resp = this._productoService.orderProductByString(data)
    this.productosList = resp

    if (data == 'fecha') this.productosList = this._productoService.orderProductByDate()
  }

  filterChange(){
    let selectText = this.filter.nativeElement.value
    let text = this.filterText.nativeElement.value

    if (selectText == '') return

    if(text == '') this.productosList = this._productoService.getProductos()

    let producto = this._productoService.getProductos()
    this.productosList = producto.filter(p => p[selectText].toLowerCase().includes(text.toLowerCase()))
  }
  
}
