import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import idytRouter from './routes/idyt.route.js';
import youtubeRouter from './routes/youtube.route.js';
import { PORT } from './libs/config.js';
import { connectMongo } from './libs/database.js';

const app = express();
connectMongo();

app.use(cors());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());

app.use(youtubeRouter);
app.use(idytRouter);
app.use('/auth', authRouter);
