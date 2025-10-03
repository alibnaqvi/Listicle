import './config/dotenv.js'
import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'
import ItemsController from './controllers/items.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Static assets
app.use(express.static(path.join(__dirname, 'public')))

// API routes
app.get('/api/items', ItemsController.getItems)
app.get('/api/items/:id', ItemsController.getItemById)

// Detail HTML route
app.get('/bosses/:id', async (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'detail.html'))
})

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
