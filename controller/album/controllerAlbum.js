/**************************************************************************************
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de álbum
 * Data: 22/05/25
 * Autor: Bruno Dias
 * Versão: 1.0
 *************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const albumDAO = require('../../model/DAO/album.js')

const inserirAlbum = async function(album, contentType) {
    if (String(contentType).toLowerCase() === 'application/json') {
        if (!album.nome || !album.ano_lancamento || !album.id_artista) {
            return MESSAGE.ERROR_REQUIRED_FIEDLS
        } else {
            const result = await albumDAO.insertAlbum(album)
            return result ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } else {
        return MESSAGE.ERROR_CONTENT_TYPE
    }
}

const listarAlbuns = async function() {
    const result = await albumDAO.selectAllAlbuns()
    if (result && result.length > 0) {
        return {
            status: true,
            status_code: 200,
            itens: result.length,
            albuns: result
        }
    } else {
        return MESSAGE.ERROR_NOT_FOUND
    }
}

const buscarAlbum = async function(id) {
    if (!id || isNaN(id) || id <= 0)
        return MESSAGE.ERROR_REQUIRED_FIEDLS

    const result = await albumDAO.selectAlbumById(id)
    if (result && result.length > 0) {
        return {
            status: true,
            status_code: 200,
            album: result
        }
    } else {
        return MESSAGE.ERROR_NOT_FOUND
    }
}

const atualizarAlbum = async function(album, id, contentType) {
    if (String(contentType).toLowerCase() !== 'application/json')
        return MESSAGE.ERROR_CONTENT_TYPE

    if (!album.nome || !album.ano_lancamento || !album.id_artista)
        return MESSAGE.ERROR_REQUIRED_FIEDLS

    const albumExistente = await buscarAlbum(id)
    if (albumExistente.status_code !== 200)
        return albumExistente

    album.id = id
    const result = await albumDAO.updateAlbum(album)
    return result ? MESSAGE.SUCCESS_UPDATE_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
}

const excluirAlbum = async function(id) {
    if (!id || isNaN(id) || id <= 0)
        return MESSAGE.ERROR_REQUIRED_FIEDLS

    const album = await buscarAlbum(id)
    if (album.status_code === 200) {
        const result = await albumDAO.deleteAlbum(id)
        return result ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    } else {
        return album
    }
}

module.exports = {
    inserirAlbum,
    listarAlbuns,
    buscarAlbum,
    atualizarAlbum,
    excluirAlbum
}
