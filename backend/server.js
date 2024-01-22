import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import authRouter from './routes/auth.route.js';


dotenv.config();

mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
        console.log('MongoDB connected');
    }).catch((error) => {
        console.log("Error: ", error);
    })

const app = express();

app.use(express.json())

app.listen(3000, () => {
    console.log('Server running at port 3000')
})


app.use('/api/user', userRoute);
app.use('/api/auth', authRouter)