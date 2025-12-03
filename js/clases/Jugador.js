import { CONSTANTES } from '../constants.js';
import { Producto } from './Producto.js';

export class Jugador {
    constructor(nombre, avatar = 'recursos/img/chico.png') {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = 0;
        this.vida = CONSTANTES.VIDA_INICIAL_JUGADOR;
        this.vidaMaxima = CONSTANTES.VIDA_INICIAL_JUGADOR;
        this.inventario = [];
    }

    anadirObjetoAlInventario(producto) {
        const productoClon = new Producto(producto);
        productoClon.id = producto.id;
        this.inventario.push(productoClon);
    }

    sumarPuntos(puntosGanados) {
        this.puntos += puntosGanados;
    }

    obtenerAtaqueTotal() {
        const ataqueBase = 0; 
        return this.inventario.reduce((total, { tipo, bonus }) => {
            return tipo === CONSTANTES.TIPOS_PRODUCTO.ARMA ? total + bonus : total;
        }, ataqueBase);
    }

    obtenerDefensaTotal() {
        const defensaBase = 0; 
        return this.inventario.reduce((total, { tipo, bonus }) => {
            return tipo === CONSTANTES.TIPOS_PRODUCTO.ARMADURA ? total + bonus : total;
        }, defensaBase);
    }

    obtenerVidaTotal() {
        return this.vida; 
    }

    usarConsumible(consumible) {
        if (consumible.tipo !== CONSTANTES.TIPOS_PRODUCTO.CONSUMIBLE) return;

        this.vida += consumible.bonus;
        if (this.vida > this.vidaMaxima) {
            this.vida = this.vidaMaxima;
        }

        const indice = this.inventario.findIndex(item => item.id === consumible.id);
        if (indice !== -1) {
            this.inventario.splice(indice, 1);
        }
    }
}