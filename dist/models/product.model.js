import { query } from "../config/db.js";
export const ProductModel = {
    async listar(filtros) {
        const { maxPrice, page, limit } = filtros;
        let sql = "SELECT * FROM products";
        const valores = [];
        if (maxPrice !== undefined) {
            valores.push(maxPrice);
            sql += ` WHERE price <= $${valores.length}`;
        }
        sql += " ORDER BY id ASC";
        const offset = (page - 1) * limit;
        valores.push(limit);
        sql += ` LIMIT $${valores.length}`;
        valores.push(offset);
        sql += ` OFFSET $${valores.length}`;
        const { rows } = await query(sql, valores);
        return rows;
    },
    async getProductById(id) {
        const { rows } = await query("SELECT * FROM products WHERE id = $1", [id]);
        return rows[0] || null;
    },
    async insertProduct(name, description, price) {
        const text = "INSERT INTO products(name, description, price) VALUES($1, $2, $3) RETURNING *";
        const { rows } = await query(text, [name, description, price]);
        return rows[0];
    },
    async updateProduct(id, name, description, price) {
        const text = `
      UPDATE products 
      SET name = $1, description = $2, price = $3 
      WHERE id = $4 
      RETURNING *
    `;
        const { rows } = await query(text, [name, description, price, id]);
        return rows[0] || null;
    },
};
//# sourceMappingURL=product.model.js.map