const db = require('../config/db');

class Catedratico {
    static async getAllCatedraticos() {
        const [rows] = await db.query('SELECT * FROM catedraticos');
        return rows;
    }
}

module.exports = Catedratico;