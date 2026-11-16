/**
 * Ejercicio 3 — Herencia
 * 
 * Pilar aplicado: HERENCIA
 * Permite definir una clase base (Empleado) con atributos y comportamientos comunes
 * que son heredados por clases derivadas (EmpleadoFijo). La subclase reutiliza el
 * estado y la lógica de la clase padre (como el método describir), y a la vez
 * especializa o sobreescribe los métodos necesarios (calcularSueldo).
 */

export class Empleado {
  protected nombre: string;
  protected antiguedad: number;

  constructor(nombre: string, antiguedad: number) {
    if (antiguedad < 0) {
      throw new Error("La antigüedad no puede ser negativa.");
    }
    this.nombre = nombre;
    this.antiguedad = antiguedad;
  }

  /**
   * La clase base no conoce la fórmula concreta de liquidación;
   * retorna 0 por defecto para que las subclases definan su implementación.
   */
  calcularSueldo(): number {
    return 0;
  }

  /**
   * Método de plantilla que describe al empleado.
   * Utiliza this.calcularSueldo(), por lo que gracias al despacho dinámico
   * funciona automáticamente para cualquier subclase sin necesidad de reescribirlo.
   */
  describir(): string {
    const sufijoAnios = this.antiguedad === 1 ? "año" : "años";
    return `${this.nombre} (${this.antiguedad} ${sufijoAnios}) — sueldo: $${this.calcularSueldo()}`;
  }
}

export class EmpleadoFijo extends Empleado {
  protected sueldoBase: number;

  constructor(nombre: string, antiguedad: number, sueldoBase: number) {
    super(nombre, antiguedad);
    if (sueldoBase < 0) {
      throw new Error("El sueldo base no puede ser negativo.");
    }
    this.sueldoBase = sueldoBase;
  }

  /**
   * Sobreescribe calcularSueldo:
   * Retorna el sueldoBase más un bono de 2% por cada año de antigüedad.
   */
  override calcularSueldo(): number {
    const porcentajeBono = 0.02 * this.antiguedad;
    const bono = this.sueldoBase * porcentajeBono;
    return this.sueldoBase + bono;
  }
}

// ==========================================
// Bloque de prueba
// ==========================================
console.log("=== EJERCICIO 3: HERENCIA ===\n");

console.log("--- Instancia de la clase base Empleado ---");
const empleadoGenerico = new Empleado("Empleado Genérico", 1);
console.log(`Cálculo directo sueldo: $${empleadoGenerico.calcularSueldo()}`);
console.log(empleadoGenerico.describir());

console.log("\n--- Instancias de EmpleadoFijo (subclase) ---");
const juan = new EmpleadoFijo("Juan", 3, 100000);
// Cálculo esperado: 100000 + (100000 * 0.02 * 3) = 100000 + 6000 = 106000
console.log(juan.describir());
console.log(`Detalle Juan -> Base: $100000, Bono (6%): $6000, Total calculado: $${juan.calcularSueldo()}`);

const maria = new EmpleadoFijo("María", 5, 200000);
// Cálculo esperado: 200000 + (200000 * 0.02 * 5) = 200000 + 20000 = 220000
console.log(maria.describir());
console.log(`Detalle María -> Base: $200000, Bono (10%): $20000, Total calculado: $${maria.calcularSueldo()}`);
