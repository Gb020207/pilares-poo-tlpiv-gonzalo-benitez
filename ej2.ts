/**
 * Ejercicio 2 — Encapsulamiento
 * 
 * Pilar aplicado: ENCAPSULAMIENTO
 * Consiste en ocultar el estado interno de los objetos y restringir el acceso
 * directo a sus datos sensibles (como el saldo y el historial de transacciones).
 * Solo se permite la interacción mediante métodos públicos controlados que
 * validan y garantizan la integridad de la información en todo momento.
 */

export class CuentaBancaria {
  readonly titular: string;
  private saldo: number;
  private historial: string[];

  constructor(titular: string, saldoInicial: number = 0) {
    if (saldoInicial < 0) {
      throw new Error("El saldo inicial no puede ser negativo.");
    }
    this.titular = titular;
    this.saldo = saldoInicial;
    this.historial = [];

    if (saldoInicial > 0) {
      this.historial.push(`saldo inicial: +${saldoInicial}`);
    }
  }

  /**
   * Realiza un depósito sumando al saldo y registrando el movimiento.
   * Rechaza montos menores o iguales a 0.
   */
  depositar(monto: number): void {
    if (monto <= 0) {
      throw new Error(`El monto a depositar debe ser mayor a 0 (se recibió: $${monto}).`);
    }

    this.saldo += monto;
    this.historial.push(`depósito: +${monto}`);
  }

  /**
   * Realiza un retiro descontando del saldo y registrando el movimiento.
   * Rechaza si el monto es <= 0 o si supera el saldo disponible.
   */
  retirar(monto: number): void {
    if (monto <= 0) {
      throw new Error(`El monto a retirar debe ser mayor a 0 (se recibió: $${monto}).`);
    }

    if (monto > this.saldo) {
      throw new Error(
        `Fondos insuficientes: saldo disponible $${this.saldo}, monto solicitado $${monto}.`
      );
    }

    this.saldo -= monto;
    this.historial.push(`retiro: -${monto}`);
  }

  /**
   * Devuelve el saldo actual de la cuenta.
   */
  consultarSaldo(): number {
    return this.saldo;
  }

  /**
   * Devuelve una copia superficial del historial de movimientos.
   * Protege el arreglo interno real contra modificaciones externas (copia defensiva).
   */
  obtenerHistorial(): string[] {
    return [...this.historial];
  }
}

// ==========================================
// Bloque de prueba
// ==========================================
console.log("=== EJERCICIO 2: ENCAPSULAMIENTO ===\n");

const cuenta = new CuentaBancaria("Lucía Gómez", 5000);
console.log(`Cuenta creada para: ${cuenta.titular}`);
console.log(`Saldo inicial: $${cuenta.consultarSaldo()}`);

console.log("\n--- Operaciones válidas ---");
cuenta.depositar(2000);
console.log(`Depósito de $2000 exitoso. Saldo actual: $${cuenta.consultarSaldo()}`);

cuenta.retirar(1500);
console.log(`Retiro de $1500 exitoso. Saldo actual: $${cuenta.consultarSaldo()}`);

console.log("\n--- Historial de movimientos ---");
console.log(cuenta.obtenerHistorial());

console.log("\n--- Prueba de protección del historial (Copia Defensiva) ---");
const historialExterno = cuenta.obtenerHistorial();
historialExterno.push("hack: +9999999");
historialExterno.splice(0, 1);
console.log("Historial externo manipulado:", historialExterno);
console.log("Historial real dentro de la cuenta (inmutable desde afuera):", cuenta.obtenerHistorial());

console.log("\n--- Validaciones y manejo de errores ---");

try {
  cuenta.depositar(0);
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error al depositar <= 0: "${error.message}"`);
  }
}

try {
  cuenta.depositar(-500);
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error al depositar negativo: "${error.message}"`);
  }
}

try {
  cuenta.retirar(0);
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error al retirar <= 0: "${error.message}"`);
  }
}

try {
  cuenta.retirar(10000);
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error al superar saldo: "${error.message}"`);
  }
}

console.log(`\nSaldo final inalterado tras intentos fallidos: $${cuenta.consultarSaldo()}`);
