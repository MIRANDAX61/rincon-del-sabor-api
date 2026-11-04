import { query } from "../config/db.js";
 
export const ProductModel = {
  async listar() {
    const { rows } = await query("SELECT * FROM products ORDER BY id ASC");
    return rows;
  },

  async getProductById(id: number) {

    const { rows } = await query("SELECT * FROM products WHERE id = $1", [id]);
    return rows[0] || null; 
  },

  async insertProduct(name: string, description: string, price: string) {
    const text = "INSERT INTO products(name, description, price) VALUES($1, $2, $3) RETURNING *";
    const { rows } = await query(text, [name, description, price]);
    return rows[0];
  },

  async updateProduct(id: number, name: string, description: string, price: string) {
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


