/***********************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados de tipo de música no banco de dados
 * Data: 22/05/2025
 * Autor: Bruno Dias
 * Versão: 1.0
 ***********************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertTipoMusica = async (tipoMusica) => {
    try {
        const sql = `
            INSERT INTO tbl_tipomusica (tipo)
            VALUES ('${tipoMusica.tipo}')
        `
        const result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error("Erro ao inserir tipo de música:", error)
        return false
    }
}

const selectAllTiposMusica = async () => {
    try {
        const sql = `SELECT * FROM tbl_tipomusica ORDER BY id DESC`
        const result = await prisma.$queryRawUnsafe(sql)
        return result.length ? result : false
    } catch (error) {
        console.error("Erro ao buscar todos os tipos de música:", error)
        return false
    }
}

const selectTipoMusicaById = async (id) => {
    try {
        const sql = `SELECT * FROM tbl_tipomusica WHERE id = ${id}`
        const result = await prisma.$queryRawUnsafe(sql)
        return result.length ? result : false
    } catch (error) {
        console.error("Erro ao buscar tipo de música por ID:", error)
        return false
    }
}

const updateTipoMusica = async (tipoMusica) => {
    try {
        const sql = `
            UPDATE tbl_tipomusica
            SET tipo = '${tipoMusica.tipo}'
            WHERE id = ${tipoMusica.id}
        `
        const result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error("Erro ao atualizar tipo de música:", error)
        return false
    }
}

const deleteTipoMusica = async (id) => {
    try {
        const sql = `DELETE FROM tbl_tipomusica WHERE id = ${id}`
        const result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error("Erro ao deletar tipo de música:", error)
        return false
    }
}

module.exports = {
    insertTipoMusica,
    selectAllTiposMusica,
    selectTipoMusicaById,
    updateTipoMusica,
    deleteTipoMusica
}
