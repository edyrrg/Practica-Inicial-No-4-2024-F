const Publication = require('../models/Publication');

exports.getAllPublications = async (_req, res) => {
    try {
        const publications = await Publication.getAllPublications();
        res.status(200).json(publications);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving publications' });
    }
}

exports.createPublicationCatedratico = async (req, res) => {
    try {
        const { contenido, propietario, catedraticoId } = req.body;
        const fecha_creacion = new Date();
        const newPublication = new Publication(fecha_creacion, contenido, propietario);
        const publicationId = await newPublication.createPublicationCatedratico(catedraticoId);
        res.status(201).json({ id: publicationId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating publication' });
    }
}

exports.createPublicationCurso = async (req, res) => {
    try {
        const { contenido, propietario, cursosId } = req.body;
        const fecha_creacion = new Date();
        const newPublication = new Publication(fecha_creacion, contenido, propietario);
        const publicationId = await newPublication.createPublicationCurso(cursosId);
        res.status(201).json({ id: publicationId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating publication' });
    }
}

exports.getAllPublicationCursos = async (_req, res) => {
    try {
        const publicationCursos = await Publication.getAllPublicationCursos();
        res.status(200).json(publicationCursos);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving publication cursos' });
    }
}

exports.getAllPublicationCatedraticos = async (_req, res) => {
    try {
        const publicationCatedraticos = await Publication.getAllPublicationCatedraticos;
        res.status(200).json(publicationCatedraticos);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving publication cursos' });
    }
}

exports.getPublicationByCursoName = async (req, res) => {
    try {
        const { nombre_curso } = req.body;
        if (!nombre_curso) {
            return res.status(400).json({ error: 'Missing curso' });
        }
        const publicationCurso = await Publication.getPublicationByCursoName(nombre_curso);
        if (publicationCurso) {
            res.status(200).json(publicationCurso);
        } else {
            res.status(404).json({ message: 'Publication curso not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving publication curso' });
    }
}

exports.getPublicationByCatedraticoName = async (req, res) => {
    try {
        const { nombre_catedratico } = req.body;
        if (!nombre_catedratico) {
            return res.status(400).json({ error: 'Missing catedratico' });
        }
        const publicationCatedratico = await Publication.getPublicationByCatedraticoName(nombre_catedratico);
        if (publicationCatedratico) {
            res.status(200).json(publicationCatedratico);
        } else {
            res.status(404).json({ message: 'Publication catedratico not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving publication catedratico' });
    }
}