import { Enemigo } from './Enemigo.js';
import { CONSTANTES } from '../constants.js';

export class Jefe extends Enemigo {

    constructor(props, multiplicadorDano = CONSTANTES.MULTIPLICADOR_JEFE_DEFAULT) {
        super(props);
        this.multiplicadorDano = multiplicadorDano;
        this.puntosVida = Math.round(this.puntosVida * 1.5); 
    }
}