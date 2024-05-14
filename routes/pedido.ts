import express from "express";
import pedidoController from '../controllers/pedido-controller';

const router = express.Router();

// Ruta para los pedidos a domicilio
router.post('/', pedidoController);

export default router;