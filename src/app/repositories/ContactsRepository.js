const db = require('../../database/index');

class ContactsRepository {
    async findAll(orderBy = 'ASC') {
        const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        const rows = await db.query(`
        SELECT contatos.*, categorias.name AS categoryName
        FROM contatos
        LEFT JOIN categorias ON categorias.id = contatos.categoryId
        ORDER BY contatos.name ${direction}`);
        return rows;
    }

    async findById(id) {
        const [row] = await db.query(`
        SELECT contatos.*, categorias.name AS categoryName
        FROM contatos
        LEFT JOIN categorias ON categorias.id = contatos.categoryId
        WHERE contatos.id = $1`, [id]);
        return row;
    }

    async findByEmail(email) {
        const [row] = await db.query('SELECT * FROM contatos WHERE email = $1', [email]);
        return row;
    }

    async delete(id) {
        const deleteOp = await db.query('DELETE FROM contatos WHERE id = $1', [id]);
        return deleteOp;
    }

    async create({
        name, email, phone, categoryId,
    }) {
        const [row] = await db.query('INSERT INTO contatos(name, email, phone, categoryId) VALUES($1, $2, $3, $4) RETURNING *', [name, email, phone, categoryId]);
        return row;
    }

    async update(id, {
        name, email, phone, categoryId,
    }) {
        const [row] = await db.query(`
            UPDATE contatos
            SET name = $1, email = $2, phone = $3, categoryId = $4
            WHERE id = $5
            RETURNING *
            `, [name, email, phone, categoryId, id]);
        return row;
    }
}

module.exports = new ContactsRepository();
