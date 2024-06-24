import { Request, Response } from 'express';
import { pool } from '../models/db';
import { RowDataPacket, OkPacket } from 'mysql2';

// Obtener todos los productos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Productos');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).send('Error al obtener productos');
  }
};

// Obtener producto por ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Productos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener producto por ID:', err);
    res.status(500).send('Error al obtener producto por ID');
  }
};

// Crear producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { nombre, marca, precio, cantidad } = req.body;
    const [result] = await pool.query<OkPacket>('INSERT INTO Productos (nombre, marca, precio, cantidad) VALUES (?, ?, ?, ?)', [nombre, marca, precio, cantidad]);
    res.json({ id: result.insertId, nombre, marca, precio, cantidad });
  } catch (err) {
    console.error('Error al crear producto:', err);
    res.status(500).send('Error al crear producto');
  }
};

// Actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, marca, precio, cantidad } = req.body;
    await pool.query<OkPacket>('UPDATE Productos SET nombre = ?, marca = ?, precio = ?, cantidad = ? WHERE id = ?', [nombre, marca, precio, cantidad, id]);
    res.json({ id, nombre, marca, precio, cantidad });
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    res.status(500).send('Error al actualizar producto');
  }
};

// Eliminar producto
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await pool.query<OkPacket>('DELETE FROM Productos WHERE id = ?', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    res.status(500).send('Error al eliminar producto');
  }
};
