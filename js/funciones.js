/**
 * Calcula el precio final de un producto después de aplicar un descuento.
 * @param {number} precio El precio original del producto.
 * @param {number} descuento El porcentaje de descuento a aplicar (ej: 10 para 10%).
 * @returns {number} El precio final después del descuento, o el precio original si no hay descuento.
 */
export const calcularDescuento = (precio, descuento) => {
  // Aseguramos que el descuento sea un número positivo.
  const descuentoValido = Math.max(0, descuento || 0);

  // Calculamos el precio con descuento.
  const precioConDescuento = precio * (1 - descuentoValido / 100);
  
  // Usamos Math.max para garantizar que el precio final no sea negativo.
  return Math.max(0, precioConDescuento);
};