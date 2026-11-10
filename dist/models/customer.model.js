import { query } from "../config/db.js";
export const CustomerModel = {
    async findAll() {
        const { rows } = await query("SELECT * FROM customers ORDER BY id ASC");
        return rows;
    },
    async findById(id) {
        const { rows } = await query("SELECT * FROM customers WHERE id = $1", [id]);
        return rows[0];
    },
    async create(datos) {
        const { name, email, phone_number } = datos;
        const { rows } = await query(`INSERT INTO customers (name, email, phone_number)
             VALUES ($1, $2, $3)
             RETURNING *`, [name, email, phone_number ?? null]);
        return rows[0];
    },
    async update(id, datos) {
        const { name, email, phone_number } = datos;
        const { rows } = await query(`UPDATE customers
             SET name = $1,
                 email = $2, 
                 phone_number = $3
            WHERE id = $4
            RETURNING *`, [name, email, phone_number ?? null, id]);
        return rows[0];
    }
};
//# sourceMappingURL=customer.model.js.map