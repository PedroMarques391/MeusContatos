const db = require('../../database/index');

class CategoriesRepository {
    async findAll() {
        const rows = await db.query('SELECT * FROM categorias ORDER BY name');
        return rows;
    }

    async create({ name }) {
        const [row] = await db.query(`
        INSERT INTO categorias(name)
        VALUES($1)
        RETURNING *
        `, [name]);
        return row;
    }
    async delete(id) {
        const deleteOp = await db.query('DELETE FROM categorias WHERE id = $1', [id]);
        return deleteOp;
    }
}

module.exports = new CategoriesRepository();
