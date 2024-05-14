import { Request, Response } from 'express';
import HistorialService from '../services/historialServices';

const historialController = {
    getUserOrders: async (req: Request, res: Response) => {        
        try {
            const id_user = req.body.id_user;            

            if (id_user) {
                const userOrders = await HistorialService.getUserOrdersByEmail(id_user);
                res.status(200).json(userOrders);
            } else {
                res.status(401).json({ message: 'No se proporcionaron credenciales de usuario válidas' });
            }
        } catch (error) {
            console.error('Error al obtener los pedidos del usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

export default historialController;
