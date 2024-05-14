import db from '../config/configdb';
import User from '../Dto/UserDto';
import bcrypt from 'bcryptjs';
import Productos from '../Dto/productosDto';
import  Pedido  from '../Dto/pedidosDto';

class UserRepository {

    static async add(user: User){
        const sql = 'INSERT INTO users (name , email , password) VALUES (?,?,?)';
        const values = [user.name,user.email,user.password];
        return db.execute(sql, values);
    }

    static async logeo(auth: User){        
        const sql = 'SELECT * FROM users WHERE email = ?';
        const values = [auth.email];     
        return db.execute(sql, values);   
    }

    static async login(auth: any){
      const sql = 'SELECT password FROM users WHERE nombre=?';
      const values = [auth.name];
      const result: any = await db.execute(sql, values);
      if (result[0].length > 0){
        const isPasswordValid = await bcrypt.compare(auth.password, result[0][0].password);
        if (isPasswordValid){
          return {logged: true, status: "inicio de sesion exitosa"}
        }
        return {logged: false, status: "Invalid username or password" };
      }
      return {logged: false, status: "Invalid username or password" };
  }

  static async getAllMenu(): Promise<Productos[]> {
    try { 
        const sql = 'SELECT * FROM productos';
        const [rows] = await db.execute(sql);

        if (!Array.isArray(rows)) {
            throw new Error('Los datos del menu son válidos');
        }

        const menus: Productos[] = rows.map((row: any) => {
            return {
                id_pro: row.id_pro,
                name_super: row.name_super,
                desciption_super:row.desciption_super,
                price: row.price,
                image: row.image
            };
        });

        return menus;
    } catch (error) {
        console.error('Error al obtener el menu:', error);
        throw error;
    }
}


static async registrarPedido(pedido: Pedido): Promise<boolean> {
    try {
        
        const sql = 'INSERT INTO pedidos (id_user, id_pro, direccion_entrega) VALUES (?, ?, ?)';
        const values = [pedido.id_user, pedido.id_pro, pedido.direccion_entrega];

        const [result] = await db.execute(sql, values);

        
        if (result && ('affectedRows' in result) && result.affectedRows && result.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al registrar el pedido de domicilio:', error);
        throw error;
    }
}

          static async verytoken(user: User){
            const sql = 'SELECT * FROM users WHERE nombre =?'
            const values = [user.name];
            return db.execute(sql, values);
        }

        static async getUserOrders(id_user: number): Promise<Pedido[]> {
            try {
                const sql = 'SELECT * FROM pedidos WHERE id_user = ?';
                const [rows] = await db.execute(sql, [id_user]);
        
                if (!Array.isArray(rows)) {
                    throw new Error('Los datos del historial de pedidos no son válidos');
                }
        
                const userOrders: Pedido[] = rows.map((row: any) => {
                    return {
                        id_user: row.id_user,
                        id_pro: row.id_pro,
                        direccion_entrega: row.direccion_entrega,
                      
                    };
                });
        
                return userOrders;
            } catch (error) {
                console.error('Error al obtener el historial de pedidos:', error);
                throw error;
            }
        }
    }



export default UserRepository;