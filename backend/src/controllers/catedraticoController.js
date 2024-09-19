const Catedratico = require('../models/Catedratico');

exports.getAllCatedraticos = async (_req, res) => {
    try {
        const catedraticos = await Catedratico.getAllCatedraticos();
        res.status(200).json(catedraticos);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving catedraticos' });
    }
}