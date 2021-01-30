import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { RegistroComponent } from './components/registro/registro.component'
import { HomeComponent } from './components/home/home.component'
import { IndexComponent } from './components/index/index.component'
import { NuevoProductoComponent } from './components/nuevo-producto/nuevo-producto.component'
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component'
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component'
import { IsLoginGuard } from './guard/is-login.guard'

const routes: Routes = [ 
    
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home', 
    component: HomeComponent,
    canActivate:[IsLoginGuard],
    children: [
      { path: '', component: IndexComponent },
      { path: 'nuevo', component: NuevoProductoComponent },
      { path: 'detalle/:id', component: DetalleProductoComponent },
      { path: 'editar/:id', component: EditarProductoComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
