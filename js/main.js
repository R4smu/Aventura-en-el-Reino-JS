import { Jugador } from './clases/Jugador.js';
import { LISTA_ENEMIGOS } from './predefinido/listaEnemigos.js';
import { cambiarEscena } from './utils.js';
import { inicializarMercado, renderizarProductos } from './modulos/Mercado.js';
import { combate } from './modulos/Batalla.js';
import { distinguirJugador } from './modulos/Ranking.js';

let jugador;
let enemigosRestantes; 
let indiceCombateActual = 0;

const CONFETTI_URL = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.js';

function cargarConfeti() {
    return new Promise(resolve => {
        if (typeof confetti !== 'undefined') {
            resolve(confetti);
            return;
        }
        const script = document.createElement('script');
        script.src = CONFETTI_URL;
        script.onload = () => resolve(confetti);
        document.head.appendChild(script);
    });
}

async function dispararConfeti() {
    const confettiInstance = await cargarConfeti();

    confettiInstance({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6, x: 0.5 }
    });
    confettiInstance({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.4, x: 0.8 }
    });
}

function actualizarStatsUI() {
    document.getElementById('stat-ataque').textContent = jugador.obtenerAtaqueTotal();
    document.getElementById('stat-defensa').textContent = jugador.obtenerDefensaTotal();
    document.getElementById('stat-vida').textContent = jugador.vida;
    document.getElementById('stat-puntos').textContent = jugador.puntos;

    const inventarioIDs = [
        'inventario-inicio',
        'inventario-cesta',
        'inventario-enemigos',
        'inventario-batalla',
        'inventario-final'
    ];

    inventarioIDs.forEach(id => {
        const grid = document.getElementById(id);
        if (grid) {
            grid.innerHTML = '';

            jugador.inventario.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `<img src="${item.imagen}" alt="${item.nombre}">`; 
                grid.appendChild(itemDiv);
            });

            for (let i = jugador.inventario.length; i < 6; i++) {
                grid.appendChild(document.createElement('div'));
            }
        }
    });
}

function renderizarEnemigos() {
    const contenedor = document.getElementById('enemigos-container');
    contenedor.innerHTML = '';

    enemigosRestantes.forEach(enemigo => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'enemigo-card';

        tarjeta.innerHTML = `
            <img src="${enemigo.avatar}" alt="${enemigo.nombre}">
            <p><strong>${enemigo.nombre}</strong></p>
            <p>${enemigo.nivelAtaque} puntos de ataque</p>
            <p>${enemigo.puntosVida} de vida</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function reiniciarJuego() {
    jugador = new Jugador("Chico nube");
    enemigosRestantes = [...LISTA_ENEMIGOS]; 
    indiceCombateActual = 0;
    
    actualizarStatsUI();
    cambiarEscena('inicio');
}

function pasarAEscena4() {
    renderizarEnemigos();
    cambiarEscena('enemigos');
}

function avanzarDesdeMercado() {
    actualizarStatsUI(); 
    cambiarEscena('inicio');

    document.getElementById('btn-continuar-inicio').removeEventListener('click', pasarAEscena4);
    document.getElementById('btn-continuar-inicio').addEventListener('click', pasarAEscena4);
}

document.getElementById('btn-continuar-inicio').addEventListener('click', () => {

    inicializarMercado();

    renderizarProductos(jugador, actualizarStatsUI); 
    
    cambiarEscena('mercado');

    const btnComprar = document.getElementById('btn-comprar');
    if (btnComprar) {
        btnComprar.style.display = 'block'; 
        btnComprar.textContent = 'Continuar Aventura'; 

        btnComprar.removeEventListener('click', avanzarDesdeMercado);
        btnComprar.addEventListener('click', avanzarDesdeMercado);
    }
});

document.getElementById('btn-continuar-enemigos').addEventListener('click', () => {
    iniciarSiguienteCombate(); 
});

function iniciarSiguienteCombate() {
    if (indiceCombateActual < enemigosRestantes.length && jugador.vida > 0) {
        const enemigo = enemigosRestantes[indiceCombateActual];


        document.getElementById('enemigo-combate-avatar').src = enemigo.avatar;

        const { ganador, puntosObtenidos } = combate(enemigo, jugador); 

        cambiarEscena('combates'); 
        
        document.getElementById('ganador-combate').textContent = `Ganador: ${ganador}`;
        document.getElementById('puntos-ganados-combate').textContent = puntosObtenidos;
        document.getElementById('vida-restante-combate').textContent = jugador.vida;

        indiceCombateActual++;
        actualizarStatsUI();
    } else {
        mostrarResultadoFinal();
    }
}

document.getElementById('btn-continuar-combate').addEventListener('click', () => {
    if (indiceCombateActual < enemigosRestantes.length && jugador.vida > 0) {
        iniciarSiguienteCombate();
    } else {
        mostrarResultadoFinal();
    }
});

function mostrarResultadoFinal() {
    const rango = distinguirJugador(jugador.puntos);

    document.getElementById('mensaje-rango').textContent = `El jugador ha logrado ser un ${rango}`;
    document.getElementById('puntos-finales').textContent = jugador.puntos;

    cambiarEscena('final');

    dispararConfeti(); 
}

document.getElementById('btn-reiniciar').addEventListener('click', () => {
    reiniciarJuego();
});

window.onload = reiniciarJuego;