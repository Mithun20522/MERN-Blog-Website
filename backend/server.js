import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import authRouter from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import cookieParser from 'cookie-parser';
import commentRoute from './routes/comment.route.js';
import Path  from 'path';
import path from 'path';

dotenv.config();

mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
        console.log('MongoDB connected');
    }).catch((error) => {
        console.log("Error: ", error);
    })

const __dirname = path.resolve();

const app = express();

app.use(express.json())
app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/auth', authRouter);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoute);
app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.use((err, req , res , next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});


app.listen(3000, () => {
    console.log('Server running at port 3000')
})