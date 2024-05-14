const jwt = require('jsonwebtoken');

export async function generateToken(email: string){
    try {
        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h'});
        return token;
    } catch (error) {
        console.error('Error al generar el token:', error);
        throw new Error('Error al generar el token');
    }
}