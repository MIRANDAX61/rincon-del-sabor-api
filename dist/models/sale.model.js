import { query } from "../config/db.js";
export const SaleModel = {
    async listar() {
        const { rows } = await query(`
      SELECT
        s.id,
        s.customer_id,
        c.name AS customer_name,
        s.sale_date,
        s.status
      FROM sales AS s
      INNER JOIN customers AS c
        ON s.customer_id = c.id
      ORDER BY s.id ASC
    `);
        return rows;
    },
    async obtenerPorId(id) {
        const { rows } = await query(`
      SELECT
        s.id,
        s.customer_id,
        c.name AS customer_name,
        s.sale_date,
        s.status
      FROM sales AS s
      INNER JOIN customers AS c
        ON s.customer_id = c.id
      WHERE s.id = $1
      `, [id]);
        return rows[0] ?? null;
    },
    async crear(datos) {
        const { customer_id, sale_date, status } = datos;
        const { rows } = await query(`
      INSERT INTO sales (customer_id, sale_date, status)
      VALUES ($1, COALESCE($2::date, CURRENT_DATE), $3)
      RETURNING *
      `, [
            customer_id,
            sale_date ?? null,
            status ?? null
        ]);
        return rows[0];
    }
};
//# sourceMappingURL=sale.model.js.map