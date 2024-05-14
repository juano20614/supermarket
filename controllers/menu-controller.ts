import { Request, Response } from 'express';
import MenuService from '../services/MenuServices';

const getmenus = async (req: Request, res: Response) => {
    try {

        const menues = await MenuService.getAllMenu(); 
        res.status(200).json({ menues}); 
    } catch (error) {
        console.error('Error al obtener el menu:', error);
        res.status(500).json({ error: 'Error al obtener el menu' });
    }
};

export default  {getmenus} ;