const db = require('../config/db');

class Curso {
  static async getAllCursos() {
    const [rows] = await db.query('SELECT * FROM cursos');
    return rows;
  }

}

module.exports = Curso;