import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDataBase } from './config/dbConfig'
import userRoute from './routes/user/userRoutes'


dotenv.config()

const app=express()
const PORT=process.env.PORT


app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))

connectDataBase()

app.use('/api/user',userRoute)
// app.use('/api/admin',)
// app.use('/api/menu',)

app.listen(PORT,()=>{console.log(`Food_cart running on http://localhost:${PORT} `)})