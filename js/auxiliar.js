export var valor = 10000

export function guardar(clave, valor) {
    valor = JSON.stringify(valor)
    localStorage.setItem(clave, valor)
    return true
}

export function recuperar(clave) {
    return JSON.parse(localStorage.getItem(clave))
}

