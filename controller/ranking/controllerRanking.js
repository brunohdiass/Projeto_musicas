/**************************************************************************************
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de playlist
 * Data: 13/02/25
 * Autor: Bruno Dias
 * Versão: 1.0
 *************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const rankigDAO = require('../../model/DAO/ranking.js')

// Função para inserir uma playlist
const inserirRanking = async function(playlist, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                playlist.titulo == undefined || playlist.titulo == '' || playlist.titulo == null || playlist.titulo.length > 100 ||
                playlist.descricao == undefined || playlist.descricao == '' || playlist.descricao == null ||
                playlist.data_criacao == undefined || playlist.data_criacao == '' || playlist.data_criacao == null ||
                playlist.imagem == undefined || playlist.imagem == '' || playlist.imagem == null || playlist.imagem.length > 200
            ) {
                return MESSAGE.ERROR_REQUIRED_FIEDLS //400
            } else {
                let resultPlaylist = await rankigDAO.inserirPlaylist(playlist)

                if (resultPlaylist)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para listar todas as playlists
const listarPlaylist = async function() {
    try {
        let dadosPlaylist = {}
        let resultPlaylist = await rankigDAO.selectAllPlaylist()

        if (resultPlaylist != false) {
            dadosPlaylist.status = true
            dadosPlaylist.status_code = 200
            dadosPlaylist.itens = resultPlaylist.length
            dadosPlaylist.playlists = resultPlaylist
            return dadosPlaylist
        } else {
            return MESSAGE.ERROR_NOT_FOUND //404
        }
    } catch (error) {
        console.error('Erro no controller - listarPlaylist:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para buscar uma playlist pelo id
const buscarPlaylist = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        } else {
            let dadosPlaylist = {}
            let resultPlaylist = await rankigDAO.selectByIdPlaylist(id)

            if (resultPlaylist && typeof resultPlaylist === 'object') {
                dadosPlaylist.status = true
                dadosPlaylist.status_code = 200
                dadosPlaylist.playlist = resultPlaylist
                return dadosPlaylist //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para excluir uma playlist
const excluirPlaylist = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        } else {
            let resultPlaylist = await buscarPlaylist(id)

            if (resultPlaylist.status_code == 200) {
                let result = await rankigDAO.deletPlaylist(id)
                if (result) {
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else if (resultPlaylist.status_code == 404) {
                return MESSAGE.ERROR_NOT_FOUND //404
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para atualizar uma playlist
const atualizarPlaylist = async function(playlist, id, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                playlist.titulo == undefined || playlist.titulo == '' || playlist.titulo == null || playlist.titulo.length > 100 ||
                playlist.descricao == undefined || playlist.descricao == '' || playlist.descricao == null ||
                playlist.foto_capa == undefined || playlist.foto_capa == '' || playlist.foto_capa == null || playlist.foto_capa.length > 200 ||
                id == undefined || id == '' || id == null || isNaN(id) || id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIEDLS //400
            } else {
                let resultPlaylist = await buscarPlaylist(id)

                if (resultPlaylist.status_code === 200) {
                    playlist.id = id
                    let result = await rankigDAO.updatePlaylist(playlist)

                    if (result) {
                        return MESSAGE.SUCCESS_UPDATE_ITEM //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else if (resultPlaylist.status_code === 404) {
                    return MESSAGE.ERROR_NOT_FOUND //404
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirPlaylist,
    listarPlaylist,
    buscarPlaylist,
    excluirPlaylist,
    atualizarPlaylist
}