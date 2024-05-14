import express from "express";
import DomicilioService from '../services/pedidosServices';

const router = express.Router();

const hacerPedido = async (req: express.Request, res: express.Response) => {
    const { id_user, id_pro, direccion_entrega } = req.body;

    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: 'Cabecera de autorización no proporcionada' });
        }
                
        const pedidoRealizado = await DomicilioService.pedirDomicilio(id_user, id_pro, direccion_entrega);

        if (pedidoRealizado) {
            return res.status(201).json({ message: 'Pedido realizado con éxito' });
        } else {
            return res.status(500).json({ message: 'Error al realizar el pedido' });
        }
    } catch (error) {
        console.error('Error al procesar el pedido a domicilio:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export default hacerPedido;
