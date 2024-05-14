import UserRepository from '../repositories/User';
import User from '../Dto/UserDto';
import generateHash from '../helpers/generateHash';
import bcrypt from "bcryptjs";
import db from '../config/configdb';
import Auth from '../Dto/UserAuthDto';



class UserService {

    static async register(user: User) {
        user.password = await generateHash(user.password);
        return await UserRepository.add(user);
    }

    

    static async auth(auth: Auth){
        const sql = 'SELECT * FROM users WHERE email = ?';
        const values = [auth.email]; 
        const result: any = await db.execute(sql, values);
        
        if (result[0].length > 0){
            const isPasswordValid = await UserService.comparePassword(auth.password, result[0][0].password);
            
            if(isPasswordValid){
            
                return {logged: true, status: "Succesful Authentication"}
            } else {
                return {logged: false, status: "Incorrect password"}
            }
        } else {
            return {logged: false, status: "Incorrect username"}
        }
    }
    

    private static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
       
        
        return await bcrypt.compare(password, hashedPassword);
    }
   
}

export default UserService;