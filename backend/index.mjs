import cors from 'cors'
import express from 'express'

// Import des routes pour les clients
import { router as billRoutes } from './routes/bill.mjs'
import { router as clientRoutes } from './routes/client.mjs'

const app = express()
const port = 3000
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173'
}))

app.get('/', (req, res) => {
  res.send('API v1.0.0')
})

// Routes pour les factures
app.use('/bills', billRoutes)

// Routes pour les clients
app.use('/clients', clientRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
