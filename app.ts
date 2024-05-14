import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import registro from "./routes/register";
import auth from './routes/auth';
import menus from './routes/menu';
import pedido from './routes/pedido'; 
import historial from './routes/historial'; 


dotenv.config();


const app = express().use(bodyParser.json());
app.use(express.urlencoded({extended: false}));


app.use('/registro' ,  registro);
app.use('/auth', auth);
app.use('/menus', menus);
app.use('/pedido', pedido); 
app.use('/historial', historial);

const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message)
});