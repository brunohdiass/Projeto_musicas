/***********************************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados de musica no banco de dados
 * Data: 13/02/25
 * Autor: Bruno Dias
 * Versão: 1.0
 **********************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertGenero = async (genero) => {
    try {
        const sql = `
            INSERT INTO tbl_genero (nome)
            VALUES ('${genero.nome}')
        `
        const result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error("Erro ao inserir gênero:", error)
        return false
    }
}

const selectAllGeneros = async () => {
    try {
        const sql = `SELECT * FROM tbl_genero ORDER BY id DESC`
        const result = await prisma.$queryRawUnsafe(sql)
        return result.length ? result : false
    } catch (error) {
        console.error("Erro ao buscar todos os gêneros:", error)
        return false
    }
}

const selectGeneroById = async (id) => {
    try {
        const sql = `SELECT * FROM tbl_genero WHERE id = ${id}`
        const result = await prisma.$queryRawUnsafe(sql)
        return result.length ? result : false
    } catch (error) {
        console.error("Erro ao buscar gênero por ID:", error)
        return false
    }
}

const updateGenero = async (genero) => {
    try {
        const sql = `
            UPDATE tbl_genero
            SET nome = '${genero.nome}'
            WHERE id = ${genero.id}
        `
        const result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error("Erro ao atualizar gênero:", error)
        return false
    }
}

const deleteGenero = async (id) => {
    try {
        const sql = `DELETE FROM tbl_genero WHERE id = ${id}`
        const result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error("Erro ao deletar gênero:", error)
        return false
    }
}

module.exports = {
    insertGenero,
    selectAllGeneros,
    selectGeneroById,
    updateGenero,
    deleteGenero
}
