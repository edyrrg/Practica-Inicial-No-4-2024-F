const db = require('../config/db');

class Publication {
    constructor(fecha_creacion, contenido, propietario){
        this.fecha_creacion = fecha_creacion;
        this.contenido = contenido;
        this.propietario = propietario;
    }

    static async getAllPublications() {
        const query = `
            SELECT 
                p.id, 
                p.fecha_creacion, 
                p.contenido, 
                p.propietario,
                GROUP_CONCAT(DISTINCT CONCAT(c.nombres, ' ', c.apellidos) SEPARATOR ', ') AS catedraticos,
                GROUP_CONCAT(DISTINCT cu.nombre_curso SEPARATOR ', ') AS cursos
            FROM 
                publicaciones p
            LEFT JOIN 
                publicacion_catedratico pc ON p.id = pc.publicacion_id
            LEFT JOIN 
                catedraticos c ON pc.catedratico_id = c.id
            LEFT JOIN 
                publicacion_curso pu ON p.id = pu.publicacion_id
            LEFT JOIN 
                cursos cu ON pu.curso_id = cu.id
            GROUP BY 
                p.id, p.fecha_creacion, p.contenido, p.propietario
        `;

        const [rows] = await db.query(query);
    }

    async save() {
        try {
            const [result] = await db.query(
                'INSERT INTO publicaciones (fecha_creacion, contenido, propietario) VALUES (?, ?, ?)',
                [this.fecha_creacion, this.contenido, this.propietario]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error al guardar la publicación:', error);
            throw new Error('Error al guardar la publicación');
        }
    }

    async createPublicationCatedratico(catedraticoId) {
        try {
            const publication_id = this.save();
            const [result] = await db.query(
                'INSERT INTO publicacion_catedratico (publicacion_id, catedratico_id) VALUES (?, ?)',
                [publication_id , catedraticoId]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error al agregar el catedrático a la publicación:', error);
            throw new Error('Error al agregar el catedrático a la publicación');
        }
    }

    async createPublicationCurso(cursoId) {
        try {
            const publication_id = this.save();
            const [result] = await db.query(
                'INSERT INTO publicacion_curso (publicacion_id, curso_id) VALUES (?, ?)',
                [publication_id , cursoId]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error al agregar el curso a la publicación:', error);
            throw new Error('Error al agregar el curso a la publicación');
        }
    }

    static async getAllPublicationCursos() {
        const query = `
            SELECT 
                p.id,
                p.fecha_creacion,
                p.contenido,
                CONCAT(u.nombres, ' ', u.apellidos) AS propietario,
                cu.nombre_curso
            FROM 
                publicaciones p
            LEFT JOIN 
                publicacion_curso pc ON p.id = pc.publicacion_id
            LEFT JOIN 
                cursos cu ON pc.curso_id = cu.id
            LEFT JOIN 
                usuarios u ON p.propietario = u.id
        `;

        const [rows] = await db.query(query);
        return rows;
    }

    static async getAllPublicationCatedraticos() {
        const query = `
            SELECT 
                p.id,
                p.fecha_creacion,
                p.contenido,
                CONCAT(u.nombres, ' ', u.apellidos) AS propietario,
                c.nombres,
                c.apellidos
            FROM 
                publicaciones p
            LEFT JOIN 
                publicacion_catedratico pc ON p.id = pc.publicacion_id
            LEFT JOIN 
                catedraticos c ON pc.catedratico_id = c.id
            LEFT JOIN 
                usuarios u ON p.propietario = u.id
        `;

        const [rows] = await db.query(query);
        return rows;
    }

    static async getPublicationByCursoName(cursoName) {
        const query = `
            SELECT 
                p.id,
                p.fecha_creacion,
                p.contenido,
                CONCAT(u.nombres, ' ', u.apellidos) AS propietario
            FROM 
                publicaciones p
            LEFT JOIN 
                publicacion_curso pc ON p.id = pc.publicacion_id
            LEFT JOIN 
                cursos cu ON pc.curso_id = cu.id
            LEFT JOIN 
                usuarios u ON p.propietario = u.id
            WHERE 
                cu.nombre_curso LIKE ?
        `;
        const searchPattern = `%${cursoName}%`;
        const [rows] = await db.query(query, [searchPattern]);
        return rows;
    }

    static async getPublicationByCatedraticoName(catedraticoName) {
        const query = `
            SELECT 
                p.id,
                p.fecha_creacion,
                p.contenido,
                CONCAT(u.nombres, ' ', u.apellidos) AS propietario
            FROM 
                publicaciones p
            LEFT JOIN 
                publicacion_catedratico pc ON p.id = pc.publicacion_id
            LEFT JOIN 
                catedraticos c ON pc.catedratico_id = c.id
            LEFT JOIN 
                usuarios u ON p.propietario = u.id
            WHERE 
                c.nombres LIKE ? OR c.apellidos LIKE ?
        `;
        const searchPattern = `%${catedraticoName}%`;
        const [rows] = await db.query(query, [searchPattern, searchPattern]);
        return rows;
    }
}

module.exports = Publication;