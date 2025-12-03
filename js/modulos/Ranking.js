import { CONSTANTES } from '../constants.js';

export function distinguirJugador(puntuacion, umbral = CONSTANTES.UMBRAL_VETERANO) {
    if (puntuacion > umbral) {
        return "Veterano";
    } else {
        return "Novato";
    }
}