import { Enemigo } from '../clases/Enemigo.js';
import { Jefe } from '../clases/Jefe.js';

export const LISTA_ENEMIGOS = [
    new Enemigo({ nombre: "Hombre pájaro", avatar: "recursos/img/pajaro.png", nivelAtaque: 8, puntosVida: 50 }),
    new Enemigo({ nombre: "Hombre pájaro", avatar: "recursos/img/pajaro.png", nivelAtaque: 8, puntosVida: 50 }),
    new Enemigo({ nombre: "Nube malvada", avatar: "recursos/img/nubemalo.png", nivelAtaque: 9, puntosVida: 60 }),
    new Enemigo({ nombre: "Monstruo estrella", avatar: "recursos/img/estrella.png", nivelAtaque: 12, puntosVida: 80 }),

    new Jefe({ nombre: "Dragón tormenta", avatar: "recursos/img/dragon.png", nivelAtaque: 28, puntosVida: 150 }), 
];