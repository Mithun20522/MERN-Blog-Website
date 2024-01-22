import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'


dotenv.config();

mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
        console.log('MongoDB connected');
    }).catch((error) => {
        console.log("Erro: ", error);
    })

const app = express();

app.listen(3000, () => {
    console.log('Server running at port 3000')
})


app.use('/api/user', userRoute);