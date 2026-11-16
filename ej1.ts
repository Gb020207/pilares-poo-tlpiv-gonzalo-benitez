/**
 * Ejercicio 1 — Abstracción
 * 
 * Pilar aplicado: ABSTRACCIÓN
 * En un sistema de ventas, abstraer significa modelar únicamente los atributos y
 * comportamientos indispensables para comercializar un producto (nombre, precio,
 * categoría, stock y métodos de venta), dejando de lado propiedades irrelevantes
 * del mundo real como el color exacto del embalaje, material de la caja, etc.
 */

export class Producto {
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;

  constructor(nombre: string, precio: number, categoria: string, stock: number) {
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.stock = stock;
  }

  /**
   * Devuelve una descripción formateada del producto.
   */
  describir(): string {
    return `${this.nombre} (${this.categoria}): $${this.precio} — ${this.stock} unidades`;
  }

  /**
   * Verifica si hay suficiente stock disponible para vender la cantidad solicitada.
   */
  hayStock(cantidad: number): boolean {
    return cantidad > 0 && this.stock >= cantidad;
  }

  /**
   * Descuenta del stock la cantidad a vender si hay stock disponible.
   * 
   * Justificación de la decisión (lanzar Error):
   * Se decidió lanzar un Error en lugar de solo emitir un mensaje en consola.
   * En un sistema transaccional de ventas, vender sin stock suficiente o con cantidades
   * inválidas representa una operación anómala que no puede completarse. Lanzar un Error
   * garantiza que la transacción no continúe inadvertidamente y obliga a la capa superior
   * a capturar y gestionar la excepción de forma robusta.
   */
  venderUnidades(cantidad: number): void {
    if (cantidad <= 0) {
      throw new Error(`Cantidad inválida: debe ser mayor a 0 (se solicitó ${cantidad}).`);
    }

    if (!this.hayStock(cantidad)) {
      throw new Error(
        `Stock insuficiente para vender ${cantidad} unidades de "${this.nombre}". Stock disponible: ${this.stock}.`
      );
    }

    this.stock -= cantidad;
  }

  /**
   * Calcula y devuelve el precio con descuento aplicado sin modificar el precio original.
   * Es una simulación o cálculo temporal.
   */
  aplicarDescuento(porcentaje: number): number {
    if (porcentaje < 0 || porcentaje > 100) {
      throw new Error("El porcentaje de descuento debe estar entre 0 y 100.");
    }
    const factorDescuento = 1 - porcentaje / 100;
    return this.precio * factorDescuento;
  }
}

// ==========================================
// Bloque de prueba
// ==========================================
console.log("=== EJERCICIO 1: ABSTRACCIÓN ===\n");

const teclado = new Producto("Teclado", 10000, "electrónica", 5);
const yerba = new Producto("Yerba Mate 1kg", 3500, "almacén", 20);

console.log("--- Descripción inicial ---");
console.log(teclado.describir());
console.log(yerba.describir());

console.log("\n--- Consulta de stock ---");
console.log(`¿Hay stock para vender 3 teclados?: ${teclado.hayStock(3)}`);
console.log(`¿Hay stock para vender 10 teclados?: ${teclado.hayStock(10)}`);

console.log("\n--- Venta de unidades exitosa ---");
teclado.venderUnidades(2);
console.log(`Vendidas 2 unidades de teclado. Nuevo estado: ${teclado.describir()}`);

console.log("\n--- Intento de venta sin stock suficiente (manejo de Error) ---");
try {
  teclado.venderUnidades(10);
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error capturado exitosamente: "${error.message}"`);
  }
}
console.log(`Stock intacto luego del error: ${teclado.describir()}`);

console.log("\n--- Simulación de descuento ---");
const precioConDescuento = teclado.aplicarDescuento(15);
console.log(`Precio original de teclado: $${teclado.precio}`);
console.log(`Precio con 15% de descuento: $${precioConDescuento}`);
console.log(`Verificación de que el precio original no fue modificado: $${teclado.precio}`);
