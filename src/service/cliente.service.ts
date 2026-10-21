import { pool } from "../database/connection.js";
import type { Cliente, CriarCliente } from "../types/cliente.types.js";

class ClienteService {
    async getAll(): Promise<Cliente[]> {
        try {
            const res = await pool.query<Cliente>(`
                SELECT * FROM cliente`)

            return res.rows
        }
        catch (error) {
            console.error('Erro ao consultar clientes', error)
            throw new Error('Erro no banco de dados')
        }
    }

    async create(dados: CriarCliente): Promise<Cliente> {
        try {
            const res = await pool.query<Cliente>(`
                INSERT INTO cliente(nome, telefone, dt_nascimento, email)
                VALUES($1,$2,$3,$4)
                RETURNING *`, [dados.nome, dados.telefone, dados.dt_nascimento, dados.email])

            const cliente = res.rows[0]

            if (!cliente) {
                throw new Error('Valores inválidos')
            }

            return cliente
        }
        catch (error) {
            console.error('Erro ao criar cliente', error)
            throw new Error('Erro no banco de dados')
        }
    }

    async getById(id: string): Promise<Cliente> {
        try {
            const res = await pool.query<Cliente>(`
                SELECT * FROM cliente WHERE id = $1`, [id])

            const cliente = res.rows[0]

            if (!cliente) {
                throw new Error('Valores inválidos')
            }

            return cliente
        }
        catch (error) {
            console.error('Erro ao consultar cliente', error)
            throw new Error('Erro no banco de dados')

        }
    }

    async update(id: string, dados: CriarCliente): Promise<Cliente>{
        try {
            const res = await pool.query<Cliente>(`
                UPDATE cliente
                SET nome = $1, telefone = $2, dt_nascimento = $3, email = $4
                WHERE id = $5
                RETURNING *`, [dados.nome, dados.telefone, dados.dt_nascimento, dados.email, id])

            const cliente = res.rows[0]

            if (!cliente) {
                throw new Error('Valores inválidos')
            }

            return cliente
        }
        catch (error) {
            console.error('Erro ao atualizar informações', error)
            throw new Error('Erro no banco de dados')
        }
    }

    async delete(id: string){
         try {
            const res = await pool.query<Cliente>(`
                DELETE FROM cliente WHERE id = $1`, [id])

            return res.rows[0]
        }
        catch (error) {
            console.error('Erro ao deletar cliente', error)
            throw new Error('Erro no banco de dados')

        }
    }
}

export const clienteService = new ClienteService