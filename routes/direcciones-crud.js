const express = require('express');
const db = require('../db');

const router = express.Router();

// Obtener todas las direcciones
router.get('/direcciones', async(req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM direcciones');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener direcciones:', error);
        res.status(500).json({ message: 'Error al obtener direcciones' });
    }
});

// Obtener una dirección por id
router.get('/direcciones/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM direcciones WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener dirección:', error);
        res.status(500).json({ message: 'Error al obtener dirección' });
    }
});

// Crear una nueva dirección
router.post('/nuevaDireccion', async(req, res) => {
    const { descripcion, abreviacion } = req.body;
    try {
        const [result] = await db.query('INSERT INTO direcciones (descripcion, abreviacion) VALUES (?, ?)', [descripcion, abreviacion]);
        const newDireccion = {
            id: result.insertId,
            descripcion,
            abreviacion
        };
        res.status(201).json(newDireccion);
    } catch (error) {
        console.error('Error al crear nueva dirección:', error);
        res.status(500).json({ message: 'Error al crear nueva dirección' });
    }
});

// Actualizar una dirección por id
router.put('/direcciones/:id', async(req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;
    try {
        await db.query('UPDATE direcciones SET descripcion = ? WHERE id = ?', [descripcion, id]);
        res.json({ message: 'Dirección actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar dirección:', error);
        res.status(500).json({ message: 'Error al actualizar dirección' });
    }
});

// Eliminar una dirección por id
router.delete('/direcciones/:id', async(req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM direcciones WHERE id = ?', [id]);
        res.json({ message: 'Dirección eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar dirección:', error);
        res.status(500).json({ message: 'Error al eliminar dirección' });
    }
});

// Crear una nueva area
router.post('/nuevaArea', async(req, res) => {
    const { id_direccion, descripcion } = req.body;
    try {
        const [result] = await db.query('INSERT INTO areas (id_direccion, descripcion) VALUES (?, ?)', [id_direccion, descripcion]);
        const newArea = {
            id: result.insertId,
            descripcion
        };
        res.status(201).json(newArea);
    } catch (error) {
        console.error('Error al crear nueva area:', error);
        res.status(500).json({ message: 'Error al crear nueva area' });
    }
});
// Crear una nueva subarea
router.post('/nuevaSubarea', async(req, res) => {
    const {id_area, descripcion } = req.body;
    try {
        const [result] = await db.query('INSERT INTO subareas (id_area, descripcion) VALUES (?, ?)', [id_area, descripcion]);
        const newArea = {
            id: result.insertId,
            descripcion
        };
        res.status(201).json(newArea);
    } catch (error) {
        console.error('Error al crear nueva subarea:', error);
        res.status(500).json({ message: 'Error al crear nueva subárea' });
    }
});

router.get('/subareas/:id', async (req, res) => {
    const { id } = req.params; // Cambia 'area' por 'id'
    console.log(id); // Esto debería imprimir el ID seleccionado en el frontend
    try {
        const [response] = await db.query('SELECT id, descripcion FROM subareas WHERE id_area = ?', [id]); // Ajusta el SELECT
        res.json(response);
    } catch (error) {
        console.log('Error al obtener subareas', error);
        res.status(500).json({ message: 'Error al obtener subareas' }); // Devuelve un error en caso de fallo
    }
});

// Obtener todas las áreas
router.get('/areas', async(req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM areas');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        res.status(500).json({ message: 'Error al obtener áreas' });
    }
});
module.exports = router; // Exportar el router