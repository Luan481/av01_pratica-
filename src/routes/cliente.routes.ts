import { Router, type Request, type Response } from "express";
import { clienteService } from "../service/cliente.service.js";
import type { Cliente, CriarCliente } from "../types/cliente.types.js";

export const clienteRouter = Router()

clienteRouter.get("/", async (_request: Request, response: Response) => {

    try {
        return response.status(200).json(await clienteService.getAll())
    }
    catch (error) {
        return response.status(500).json({ message: "Erro interno" })
    }

})

clienteRouter.post("/", async (request: Request<{}, {}, CriarCliente>, response: Response) => {
    const dados = request.body

    try {
        return response.status(201).json(await clienteService.create(dados))
    }
    catch (error) {
        return response.status(500).json({ message: "Erro interno" })
    }

})

clienteRouter.get("/:id", async (request: Request<{ id: string }, {}, Cliente>, response: Response) => {

    const id = request.params.id

    try {
        return response.status(200).json(await clienteService.getById(id))
    }
    catch (error) {
        return response.status(500).json({ message: "Erro interno" })
    }

})

clienteRouter.patch("/:id", async (request: Request<{ id: string, dados: CriarCliente }, {}, CriarCliente>, response: Response) => {

    const id = request.params.id
    const dados = request.body

    await clienteService.update(id, dados)

    try {
        return response.status(200).json({message: "Cliente atualizado com sucesso"})
    }
    catch (error) {
        return response.status(500).json({ message: "Erro interno" })
    }

})

clienteRouter.delete("/:id", async (request: Request<{ id: string }, {}, {}>, response: Response) => {

    const id = request.params.id
    await clienteService.delete(id)

    try {
        return response.status(200).json({message: "Cliente deletado com sucesso"})
    }
    catch (error) {
        return response.status(500).json({ message: "Erro interno" })
    }

})