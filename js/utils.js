export function generarIDUnico() {
    return Math.random().toString(36).substring(2, 9);
}

export function formatearPrecio(precio) {
    const euros = (precio / 100).toFixed(2);
    return euros.replace('.', ',') + '€';
}

export function obtenerElementoAleatorio(array) {
    if (array.length === 0) return null;
    const indice = Math.floor(Math.random() * array.length);
    return array[indice];
}

export function cambiarEscena(nuevaEscena) {
    document.querySelectorAll('.escena').forEach(escena => {
        if (escena.dataset.escena === nuevaEscena) {
            escena.classList.remove('oculta');
        } else {
            escena.classList.add('oculta');
        }
    });
}