import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { AppDataSource } from './database/ormconfig';
import userRouter from './user/infrastructure/controllers/user.controller';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/users', userRouter);

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to the database');

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => console.log(error));
