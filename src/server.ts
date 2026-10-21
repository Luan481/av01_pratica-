import express from 'express'
import { clienteRouter } from './routes/cliente.routes.js'

const port = 3000
export const app = express()

app.use(express.json())
app.use('/cliente', clienteRouter)
app.listen(port, () => {
    console.log(`Servidor rodando em localhost:${port}`)
})