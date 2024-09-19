const Curso = require('../models/Curso');

exports.getAllCursos = async (_req, res) => {
    try {
        const cursos = await Curso.getAllCursos();
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving cursos' });
    }
}