import { formatearPrecio, generarIDUnico } from '../utils.js';

export class Producto {
    constructor({ nombre, imagen, precio, rareza, tipo, bonus }) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.rareza = rareza;
        this.tipo = tipo;
        this.bonus = bonus;
        this.id = generarIDUnico(); 
    }

    formatearAtributos() {
        return formatearPrecio(this.precio);
    }

    aplicarDescuento(porcentajeDescuento) {
        const nuevoPrecio = this.precio * (1 - porcentajeDescuento / 100);

        const productoClonado = new Producto({
            ...this,
            precio: Math.round(nuevoPrecio)
        });
        
        return productoClonado;
    }
}