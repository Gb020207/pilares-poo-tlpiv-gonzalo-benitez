/**
 * Ejercicio 5 — Getters y Setters
 * 
 * Concepto aplicado: ENCAPSULAMIENTO MEDIANTE ACCESSORS (GETTERS Y SETTERS)
 * Los getters y setters actúan como intermediarios entre el mundo exterior y los
 * atributos privados. Permiten aplicar reglas de validación en tiempo de asignación,
 * calcular valores derivados dinámicamente bajo demanda (sin duplicar estado),
 * y proteger la privacidad exponiendo únicamente datos seguros.
 */

export class Persona {
  private readonly dni: string;
  public nombre: string;
  private _edad!: number;
  private _email!: string;

  constructor(dni: string, nombre: string, edad: number, email: string) {
    this.dni = dni;
    this.nombre = nombre;
    // Se utilizan los setters para reutilizar la lógica de validación desde la inicialización
    this.edad = edad;
    this.email = email;
  }

  /**
   * Getter para la edad.
   */
  get edad(): number {
    return this._edad;
  }

  /**
   * Setter para la edad: rechaza valores negativos o mayores a 120 lanzando un Error.
   */
  set edad(valor: number) {
    if (valor < 0 || valor > 120) {
      throw new Error(`Edad inválida (${valor}): no se permiten valores negativos ni superiores a 120 años.`);
    }
    this._edad = valor;
  }

  /**
   * Getter para el email.
   */
  get email(): string {
    return this._email;
  }

  /**
   * Setter para el email: rechaza valores que no contengan '@' lanzando un Error.
   */
  set email(valor: string) {
    if (!valor.includes("@")) {
      throw new Error(`Email inválido ("${valor}"): debe contener un caracter '@'.`);
    }
    this._email = valor;
  }

  /**
   * Getter de solo lectura que calcula al vuelo si la persona es mayor de edad (>= 18).
   * No guarda la bandera en una propiedad fija, garantizando consistencia si la edad cambia.
   */
  get esMayorDeEdad(): boolean {
    return this._edad >= 18;
  }

  /**
   * Getter de solo lectura con información pública segura.
   * Expone nombre y condición de mayoría de edad sin revelar datos sensibles (DNI ni email).
   */
  get datosPublicos(): string {
    const estadoMayor = this.esMayorDeEdad ? "mayor de edad" : "menor de edad";
    return `Nombre: ${this.nombre} (${estadoMayor})`;
  }
}

// ==========================================
// Bloque de prueba
// ==========================================
console.log("=== EJERCICIO 5: GETTERS Y SETTERS ===\n");

// Creación de instancias válidas
const persona1 = new Persona("40123456", "Camila Rossi", 25, "camila.rossi@example.com");
const persona2 = new Persona("55987654", "Benjamín Pérez", 15, "benja@colegio.edu.ar");

console.log("--- Acceso a propiedades y getters ---");
console.log(`Persona 1 -> Nombre: ${persona1.nombre}, Edad: ${persona1.edad}, Email: ${persona1.email}`);
console.log(`¿Es mayor de edad?: ${persona1.esMayorDeEdad}`);
console.log(`Datos públicos: "${persona1.datosPublicos}"`);

console.log("\nPersona 2 ->");
console.log(`Nombre: ${persona2.nombre}, Edad: ${persona2.edad}`);
console.log(`¿Es mayor de edad?: ${persona2.esMayorDeEdad}`);
console.log(`Datos públicos: "${persona2.datosPublicos}"`);

console.log("\n--- Modificación válida a través de nombre (público) y setters ---");
persona1.nombre = "Camila R. Martínez";
persona1.edad = 26;
persona1.email = "camila.nuevo@empresa.com";
console.log(`Datos actualizados: ${persona1.datosPublicos} | Email: ${persona1.email} | Edad: ${persona1.edad}`);

console.log("\n--- Transición calculada en esMayorDeEdad ---");
console.log(`Benjamín antes de cumplir años: ${persona2.datosPublicos} (esMayorDeEdad: ${persona2.esMayorDeEdad})`);
persona2.edad = 18;
console.log(`Benjamín después de cumplir 18: ${persona2.datosPublicos} (esMayorDeEdad: ${persona2.esMayorDeEdad})`);

console.log("\n--- Validación de restricciones con manejo de errores ---");

// 1. Edad negativa
try {
  persona1.edad = -5;
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error edad negativa: "${error.message}"`);
  }
}

// 2. Edad mayor a 120
try {
  persona1.edad = 135;
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error edad > 120: "${error.message}"`);
  }
}

// 3. Email sin '@'
try {
  persona1.email = "correosinformato.com";
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error email sin '@': "${error.message}"`);
  }
}

// 4. Instanciación con datos inválidos en constructor
try {
  new Persona("12345678", "Prueba Fallida", -1, "test@mail.com");
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error en constructor con edad inválida: "${error.message}"`);
  }
}

try {
  new Persona("12345678", "Prueba Fallida", 30, "correoInvalido");
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error en constructor con email inválido: "${error.message}"`);
  }
}

console.log("\n--- Verificación de integridad final ---");
console.log(`Persona 1 intacta: ${persona1.datosPublicos} | Edad: ${persona1.edad} | Email: ${persona1.email}`);
