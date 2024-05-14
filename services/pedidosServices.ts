import UserRepository from '../repositories/User';
import PedidoDomicilio from '../Dto/pedidosDto';

class DomicilioService {

    static async pedirDomicilio(id_user: number,id_pro: number, direccion_entrega: string): Promise<boolean> {
        try {
            const pedido: PedidoDomicilio = {
                id_user,
                id_pro,
                direccion_entrega,
            };
            const result = await UserRepository.registrarPedido(pedido);
            return result;
        } catch (error) {
            console.error('Error al registrar el pedido de domicilio:', error);
            throw error;
        }
    }
}

export default DomicilioService;