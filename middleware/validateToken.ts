import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headerToken = req.headers['authorization'];

        if (headerToken && headerToken.startsWith('Bearer ')) {
            
            const bearerToken = headerToken.split(' ')[2].trim();  
                  
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'valeed', (err) => {
                if (err) {
                    if (err instanceof TokenExpiredError) {
                        return res.status(401).json({ status: "autorizacion denegada: token expirado" });
                    }
                    if (err instanceof JsonWebTokenError) {
                        return res.status(401).json({ status: "autorizacion denegada: token invalido" });
                    }
                }
                // Si el token es válido, pasa la solicitud al siguiente middleware
                next();
            });
        } else {
            // Si no se proporciona un token en el encabezado de autorización
            res.status(401).json({ status: 'Acceso denegado: Token no proporcionado' });
        }
    } catch (error) {
        // Si ocurre un error durante la validación del token
        console.error("Error durante la validación del token:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export default validateToken;