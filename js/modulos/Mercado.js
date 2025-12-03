import { Producto } from '../clases/Producto.js';
import { LISTA_PRODUCTOS } from '../predefinido/listaProductos.js';
import { CONSTANTES } from '../constants.js';
import { obtenerElementoAleatorio, formatearPrecio } from '../utils.js';

let productosDisponibles = [];

export function inicializarMercado() {
    const rarezaConDescuento = obtenerElementoAleatorio(Object.values(CONSTANTES.RAREZAS));
    const descuento = 20;
    productosDisponibles = LISTA_PRODUCTOS.map(prodData => {
        const productoBase = new Producto(prodData);

        if (productoBase.rareza === rarezaConDescuento) {
            return productoBase.aplicarDescuento(descuento);
        }
        return productoBase;
    });
}

export function filtrarProductos(rareza) {
    return productosDisponibles.filter(producto => producto.rareza === rareza);
}

export function buscarProducto(nombre) {
    return productosDisponibles.filter(({ nombre: nombreProd }) => 
        nombreProd.toLowerCase().includes(nombre.toLowerCase())
    );
}

export function renderizarProductos(jugador, actualizarStatsUICallback) {
    const contenedor = document.getElementById('productos-container');
    const cestaDOM = document.getElementById('inventario-cesta');
    contenedor.innerHTML = '';
    cestaDOM.innerHTML = '<div></div><div></div><div></div><div></div><div></div><div></div>';

    productosDisponibles.forEach(producto => { 
        const tarjeta = document.createElement('div');
        tarjeta.className = 'producto-card';
        tarjeta.dataset.id = producto.id; 

        let botonTexto = 'Añadir';
        
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p><strong>${producto.nombre}</strong></p>
            <p>${producto.tipo}: +${producto.bonus}</p>
            <p>${formatearPrecio(producto.precio)}</p>

            <button class="btn-toggle-cesta boton-principal">${botonTexto}</button>
        `;
        
        const boton = tarjeta.querySelector('.btn-toggle-cesta');
        boton.addEventListener('click', () => toggleCesta(producto, tarjeta, jugador, actualizarStatsUICallback));

        contenedor.appendChild(tarjeta);
    });
}

function toggleCesta(producto, tarjeta, jugador, actualizarStatsUICallback) {
    const estaEnCesta = tarjeta.classList.contains('seleccionado');

    if (estaEnCesta) {
        const indice = jugador.inventario.findIndex(item => item.id === producto.id);

        if (indice !== -1) {
            jugador.inventario.splice(indice, 1);
            tarjeta.classList.remove('seleccionado');
            tarjeta.querySelector('.btn-toggle-cesta').textContent = 'Añadir';
        }

    } else {

        if (jugador.inventario.length >= 6) {
             alert("Tu inventario está lleno (Máximo 6 items).");
             return;
        }

        jugador.anadirObjetoAlInventario(producto); 

        tarjeta.classList.add('seleccionado');
        tarjeta.querySelector('.btn-toggle-cesta').textContent = 'Retirar';
    }

    actualizarStatsUICallback();
}
