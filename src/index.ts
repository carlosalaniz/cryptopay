import express from 'express';
import { RegisterRoutes } from './routes';
import * as swaggerUI from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000;

// Register TSOA routes
RegisterRoutes(app);
app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});