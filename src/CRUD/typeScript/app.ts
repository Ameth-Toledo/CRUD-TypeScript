import express from 'express';
import bodyParser from 'body-parser';
import * as productController from './controllers/productsController';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.get('/api/products', productController.getProducts);
app.get('/api/products/:id', productController.getProductById);
app.post('/api/products', productController.createProduct);
app.put('/api/products/:id', productController.updateProduct);
app.delete('/api/products/:id', productController.deleteProduct);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
