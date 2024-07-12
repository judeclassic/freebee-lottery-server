import cors from "cors";
import express from "express";
import http from "http";
import dotenv from 'dotenv';
import DBConnection from "./shared/utils/connectDB";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

DBConnection.connect();

const httpsServer = http.createServer(app);

const PORT = process.env.PORT || 8080;

httpsServer.listen(PORT,
() => {
    console.log(`Server in Development Mode and Listening on port ${PORT}`)
});