import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import 'dotenv/config'
import postRoutes from './routes/posts.js'
import listEndpoints from 'express-list-endpoints'

const app = express()


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {app.listen(PORT, () => {
       console.log(`Server Running on Port ${PORT}`)
        console.table(listEndpoints(app))
    })})
   .catch((err) => console.log(`${err}`))
