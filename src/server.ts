import express from 'express'
import { PORT } from './Constants'
import popular from './Routes/popular'
import cors from 'cors'
(async () => {
    const app = express()
    app.use(express.json())
    app.use(cors())

    //Routes
    app.use('/popular', popular())

    //Listen
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})()