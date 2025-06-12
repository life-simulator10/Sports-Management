import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'express';
import userRouter from './Routes/user.js';
import eventRouter from './Routes/event.js';
import tableRouter from './Routes/table.js';
import fixturesRouter from './Routes/fixtures.js';
import resultRouter from './Routes/result.js';
import matchRouter from './Routes/match.js';
import highlightRouter from './Routes/highlight.js';
import messageRouter from './Routes/message.js';
import newsRouter from './Routes/news.js';
import galleryRouter from './Routes/gallery.js';
import programRouter from './Routes/program.js';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({ limit: '50mb' }))

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

//home testing route
app.get('/', (req, res) => res.json({ message: 'This is home route' }))

// user Router
app.use('/api/user', userRouter);

//event Router
app.use('/api/event', eventRouter);

//table Router
app.use('/api/table', tableRouter);

//fixtures Router
app.use('/api/fixtures', fixturesRouter);

//Matches Router
app.use('/api/match', matchRouter);

//Program Router
app.use('/api/program', programRouter);

//result Router
app.use('/api/result', resultRouter);

//highlight router 
app.use('/api/highlights', highlightRouter);

//message router
app.use('/api/message', messageRouter);

app.use('/api/news', newsRouter);

//gallery router
app.use('/api/gallery', galleryRouter);

mongoose.connect(
    process.env.MONGO_URI, {
    dbName: process.env.DB_NAME
}
).then(() => console.log("MongoDB connected Successfully")).catch((err) => console.log(err));

const port = 1000;

app.listen(port, () => console.log(`server is running on port ${port}`))
