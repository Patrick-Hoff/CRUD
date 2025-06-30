import express from 'express'
import cors from 'cors'
import userRoutes from './routes/users.js'

const app = express()

app.use(express.json())
app.use(cors())

// Rota padrão para testar se a API está rodando
app.get('/', (req, res) => {
  res.send('API online! 🚀');
});

app.use('/users', userRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
