
import User from '../Dto/UserDto';
import { Request, Response } from "express";
import UserService from '../services/Userservices';

let register = async (req: Request, res: Response) => {
    try {
      const {
        name,
        email,
        password,
      
      } = req.body;
  
      const registerUser = await UserService.register(new User( name ,email, password));
  
      return res.status(201).send(
        { status: 'register ok' }
      );
  
    } catch (error: any) {
      if (error && error.code == "ER_DUP_ENTRY") {
        return res.status(500).send({ errorInfo: error.sqlMessage });
      }else{
        return res.status(500).send({error})
      }
    }
  }
  
  export default register;
  