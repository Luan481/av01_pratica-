import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg

export const pool = new Pool

pool.on('error', () => {
    console.error(`Conexão idle`)
    process.exit(1)
})