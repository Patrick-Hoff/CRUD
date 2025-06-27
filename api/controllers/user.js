import { db } from '../db.js'

// Buscar todos os usuários
export const getUsers = (_, res) => {
    const q = 'SELECT * FROM usuarios'

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

// Adicionar novo usuário
export const addUser = (req, res) => {
    const q = 'INSERT INTO usuarios(`nome`, `email`, `telefone`, `aniversario`) VALUES (?)'

    const values = [
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.aniversario,
    ]

    db.query(q, [values], (err) => {
        if (err) {
            console.error("Erro ao adicionar usuário:", err)
            return res.status(500).json(err)
        }
        return res.status(200).json('Usuário criado com sucesso.')
    })
}

// Atualizar usuário existente
export const updateUser = (req, res) => {
    const q = 'UPDATE usuarios SET `nome` = ?, `email` = ?, `telefone` = ?, `aniversario` = ? WHERE `id` =  ?'

    const values = [
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.aniversario,
    ]

    db.query(q, [...values, req.params.id], (err) => {
        if (err) {
            console.error("Erro ao atualizar usuário:", err)
            return res.status(500).json(err)
        }
        return res.status(200).json('Usuário atualizado com sucesso')
    })
}

// Deletar usuário
export const deleteUser = (req, res) => {
    const q = 'DELETE FROM usuarios WHERE `id` = ?'

    db.query(q, [req.params.id], (err) => {
        if (err) {
            console.error("Erro ao deletar usuário:", err)
            return res.status(500).json(err)
        }
        return res.status(200).json('Usuário deletado com sucesso.')
    })
}
