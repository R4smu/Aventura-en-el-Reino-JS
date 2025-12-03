import { CONSTANTES } from '../constants.js';
import { Enemigo } from '../clases/Enemigo.js';
import { Jefe } from '../clases/Jefe.js';

export function combate(enemigo, jugador) {
    let vidaJugadorActual = jugador.vida;
    let vidaEnemigoActual = enemigo.puntosVida;
    const ataqueJugador = jugador.obtenerAtaqueTotal();
    const defensaJugador = jugador.obtenerDefensaTotal();
    const ataqueEnemigo = enemigo.nivelAtaque;
    
    const registro = [];

    registro.push(`--- ¡Comienza el combate contra ${enemigo.nombre}! ---`);

    let turno = 1;
    let ganador = null;

    while (vidaJugadorActual > 0 && vidaEnemigoActual > 0) {
        registro.push(`\n**Turno ${turno}**`);

        vidaEnemigoActual -= ataqueJugador;
        registro.push(`> ${jugador.nombre} ataca. Daño: ${ataqueJugador}. Vida ${enemigo.nombre} restante: ${Math.max(0, vidaEnemigoActual)}.`);

        if (vidaEnemigoActual <= 0) {
            ganador = jugador.nombre;
            break;
        }

        let danoRecibido = Math.max(0, ataqueEnemigo - defensaJugador);

        if (enemigo instanceof Jefe) {
            danoRecibido = Math.round(danoRecibido * enemigo.multiplicadorDano);
            registro.push(`> ¡${enemigo.nombre} (Jefe) usa su multiplicador de daño!`);
        }
        
        vidaJugadorActual -= danoRecibido;
        registro.push(`> ${enemigo.nombre} ataca. Daño recibido: ${danoRecibido} (Defensa: ${defensaJugador}). Vida ${jugador.nombre} restante: ${Math.max(0, vidaJugadorActual)}.`);

        if (vidaJugadorActual <= 0) {
            ganador = enemigo.nombre;
            break;
        }
        
        turno++;
        if (turno > 100) {
            registro.push("El combate se extiende demasiado, empate.");
            ganador = "Empate";
            break;
        }
    }

    let puntosObtenidos = 0;
    
    if (ganador === jugador.nombre) {
        puntosObtenidos = CONSTANTES.PUNTOS_BASE_VICTORIA + enemigo.nivelAtaque;
        
        if (enemigo instanceof Jefe) {
            puntosObtenidos = Math.round(puntosObtenidos * enemigo.multiplicadorDano);
            registro.push(`> ¡Victoria contra un Jefe! Puntos x ${enemigo.multiplicadorDano}.`);
        }

        jugador.sumarPuntos(puntosObtenidos);
        jugador.vida = vidaJugadorActual; 

    } else {
        
        jugador.vida = Math.max(0, vidaJugadorActual); 
    }

    registro.push(`\n--- Fin del Combate. Ganador: ${ganador} ---`);
    registro.push(`Puntos generados: ${puntosObtenidos}`);
    registro.push(`Vida de ${jugador.nombre} al final: ${jugador.vida}`);

    return { ganador, puntosObtenidos, registro };
}