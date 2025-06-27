import express from 'express'
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} from '../controllers/user.js'

const router = express.Router()

// Buscar todos os usuários
router.get('/', getUsers)

// Adicionar novo usuário
router.post('/', addUser)

// Atualizar usuário por ID
router.put('/:id', updateUser)

// Deletar usuário por ID
router.delete('/:id', deleteUser)

export default router
