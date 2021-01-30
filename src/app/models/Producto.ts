import { DecimalPipe } from "@angular/common";

export interface Producto{
    id?: number,
    nombre?: string,
    caracteristicas?: string,
    fecha?: any,
    correoFabricante?: string,
    paisFabricacion?: string,
    precio?: number,
    unidadesDisponibles?: number,
    unidadesVendidas?: number,
    imagen?: any
}