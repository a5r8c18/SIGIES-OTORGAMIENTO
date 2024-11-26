import { Pool } from "pg";

// Configuración de la conexión
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Tesis",
  password: "1234",
  port: 5432,
});

// Función para realizar consultas
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default {
  query,
};
