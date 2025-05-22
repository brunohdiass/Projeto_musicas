/***********************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados de álbum no banco de dados
 * Data: 22/05/25
 * Autor: Bruno Dias
 * Versão: 1.0
 ***********************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertAlbum = async (album) => {
    try {
        const sql = `
            INSERT INTO tbl_album (nome, ano_lancamento, id_artista)
            VALUES ('${album.nome}', ${album.ano_lancamento}, ${album.id_artista})
        `
        const result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error("Erro ao inserir álbum:", error)
        return false
    }
}

const selectAllAlbuns = async () => {
    try {
        const sql = `SELECT * FROM tbl_album ORDER BY id DESC`
        const result = await prisma.$queryRawUnsafe(sql)
        return result.length ? result : false
    } catch (error) {
        console.error("Erro ao buscar todos os álbuns:", error)
        return false
    }
}

const selectAlbumById = async (id) => {
    try {
        const sql = `SELECT * FROM tbl_album WHERE id = ${id}`
        const result = await prisma.$queryRawUnsafe(sql)
        return result.length ? result : false
    } catch (error) {
        console.error("Erro ao buscar álbum por ID:", error)
        return false
    }
}

const updateAlbum = async (album) => {
    try {
        const sql = `
            UPDATE tbl_album
            SET nome = '${album.nome}',
                ano_lancamento = ${album.ano_lancamento},
                id_artista = ${album.id_artista}
            WHERE id = ${album.id}
        `
        const result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error("Erro ao atualizar álbum:", error)
        return false
    }
}

const deleteAlbum = async (id) => {
    try {
        const sql = `DELETE FROM tbl_album WHERE id = ${id}`
        const result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error("Erro ao deletar álbum:", error)
        return false
    }
}

module.exports = {
    insertAlbum,
    selectAllAlbuns,
    selectAlbumById,
    updateAlbum,
    deleteAlbum
}
