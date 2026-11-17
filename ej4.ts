/**
 * Ejercicio 4 — Polimorfismo
 * 
 * Pilar aplicado: POLIMORFISMO
 * El polimorfismo permite tratar a objetos de distintas subclases (EmpleadoFijo,
 * EmpleadoPorHoras, EmpleadoPorComision) de manera uniforme a través de su interfaz
 * o clase base común (Empleado). Quien consume los objetos puede invocar
 * `calcularSueldo()` o `describir()` sin saber ni preguntar de qué tipo concreto es
 * cada uno; el entorno de ejecución resuelve dinámicamente el método adecuado.
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

  calcularSueldo(): number {
    return 0;
  }

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

  override calcularSueldo(): number {
    const porcentajeBono = 0.02 * this.antiguedad;
    const bono = this.sueldoBase * porcentajeBono;
    return this.sueldoBase + bono;
  }
}

export class EmpleadoPorHoras extends Empleado {
  protected horasTrabajadas: number;
  protected valorHora: number;

  constructor(nombre: string, antiguedad: number, horasTrabajadas: number, valorHora: number) {
    super(nombre, antiguedad);
    if (horasTrabajadas < 0 || valorHora < 0) {
      throw new Error("Las horas trabajadas y el valor hora no pueden ser negativos.");
    }
    this.horasTrabajadas = horasTrabajadas;
    this.valorHora = valorHora;
  }

  /**
   * Sueldo = horas trabajadas * valor de la hora (sin bono por antigüedad).
   */
  override calcularSueldo(): number {
    return this.horasTrabajadas * this.valorHora;
  }
}

export class EmpleadoPorComision extends Empleado {
  protected ventasDelMes: number;
  protected porcentajeComision: number;

  constructor(nombre: string, antiguedad: number, ventasDelMes: number, porcentajeComision: number) {
    super(nombre, antiguedad);
    if (ventasDelMes < 0 || porcentajeComision < 0) {
      throw new Error("Las ventas y el porcentaje de comisión no pueden ser negativos.");
    }
    this.ventasDelMes = ventasDelMes;
    this.porcentajeComision = porcentajeComision;
  }

  /**
   * Sueldo = ventas del mes * porcentaje de comisión.
   * Admite porcentaje expresado como tasa (ej: 0.10 para 10%) o como porcentaje entero (ej: 10).
   */
  override calcularSueldo(): number {
    const tasa = this.porcentajeComision > 1 ? this.porcentajeComision / 100 : this.porcentajeComision;
    return this.ventasDelMes * tasa;
  }
}

/**
 * Función que calcula el monto total de la nómina salarial.
 * Aprovecha el polimorfismo: opera sobre el tipo base Empleado[]
 * sumando el resultado de calcularSueldo() de cada uno sin importar su tipo concreto.
 */
export function calcularNomina(empleados: Empleado[]): number {
  let total = 0;
  for (const emp of empleados) {
    total += emp.calcularSueldo();
  }
  return total;
}

// ==========================================
// Bloque de prueba
// ==========================================
console.log("=== EJERCICIO 4: POLIMORFISMO ===\n");

// Creación de instancias de las 3 subclases
const empFijo1 = new EmpleadoFijo("Ana Paula", 4, 150000); // 150000 + (150000 * 0.08) = 162000
const empHoras1 = new EmpleadoPorHoras("Marcos", 1, 160, 1200); // 160 * 1200 = 192000
const empComision1 = new EmpleadoPorComision("Sofía", 2, 2000000, 10); // 2000000 * 0.10 = 200000
const empHoras2 = new EmpleadoPorHoras("Lucas", 3, 80, 1500); // 80 * 1500 = 120000
const empComision2 = new EmpleadoPorComision("Valeria", 5, 1500000, 15); // 1500000 * 0.15 = 225000

// Arreglo polimórfico de tipo Empleado[]
const empleados: Empleado[] = [
  empFijo1,
  empHoras1,
  empComision1,
  empHoras2,
  empComision2,
];

console.log("--- Recorrido del arreglo polimórfico con bucle for ---");
console.log("(Observá cómo se invoca calcularSueldo() y describir() sin preguntar el tipo concreto de cada uno)\n");

for (let i = 0; i < empleados.length; i++) {
  const empleado = empleados[i];
  console.log(`[Empleado #${i + 1}]`);
  console.log(`Descripción: ${empleado.describir()}`);
  console.log(`Sueldo liquidado: $${empleado.calcularSueldo()}`);
  console.log("-------------------------------------------------");
}

console.log("\n--- Cálculo de nómina global ---");
const totalNomina = calcularNomina(empleados);
console.log(`Total a pagar en sueldos (suma de toda la nómina): $${totalNomina}`);
