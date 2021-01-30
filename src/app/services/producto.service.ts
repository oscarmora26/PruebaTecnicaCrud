import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto'
import { HttpClient } from '@angular/common/http'
import ArrayProductos from '../../assets/productos.js'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private _http: HttpClient) { }

  productoList: Producto[] = ArrayProductos

  getProductos() {
    return this.productoList
  }

  getOneProducto(id) {
    return this.productoList.filter(producto => producto.id == id)
  }
  
  crearProducto(producto: Producto) {
    if (this.productoList.length == 0) {
      producto.id = 1
    } else {
      let lastId = this.productoList[this.productoList.length - 1].id
      producto.id = lastId + 1
    }

    this.productoList.push(producto)
    localStorage.setItem('productoList', JSON.stringify(this.productoList))
  }


  editProducto(producto) {
    let contador = 0
    let indexOfArray = 0
    this.productoList.forEach((p) => {
      if (p.id == 2) indexOfArray = contador
      contador++
    })
    this.productoList.splice(indexOfArray, 1, producto)
    localStorage.setItem('productoList', JSON.stringify(this.productoList))
  }

  deleteProducto(id: number) {
    this.productoList = this.productoList.filter(producto => producto.id != id)
    localStorage.setItem('productoList', JSON.stringify(this.productoList))
  }

  getPaise() {
    return this._http.get('https://restcountries.eu/rest/v2/all')
  }

  orderProductByString(filter: any) {
    let copia = this.productoList.slice()
    copia.sort((a, b) => {
      if (a[filter] > b[filter]) {
        return 1
      }
      if (a[filter] < b[filter]) {
        return -1
      }
      return 0
    })
    return copia
  }

  orderProductByDate() {
    let copia = this.productoList.slice()
    copia.sort((a, b) => {
      if (new Date(a.fecha) > new Date(b.fecha)) {
        return 1
      }
      if (new Date(a.fecha) < new Date(b.fecha)) {
        return -1
      }
      return 0
    })
    return copia
  }  
  
  validateProductInLocalStorage = () => {

    if (!localStorage.getItem('productoList')) {
      localStorage.setItem('productoList', JSON.stringify(this.productoList))
    } else {
      this.productoList = JSON.parse(localStorage.getItem('productoList'))
    }
  }

}
