/**************************************************************************************
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de artista
 * Data: 13/02/25
 * Autor: Bruno Dias
 * Versão: 1.0
 *************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const artistaDAO = require('../../model/DAO/artista.js')

// Função para inserir um artista
const inserirArtista = async function(artista, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                artista.nome == undefined || artista.nome == '' || artista.nome == null || artista.nome.length > 80
            ) {
                return MESSAGE.ERROR_REQUIRED_FIEDLS //400
            } else {
                let resultArtista = await artistaDAO.inserirArtista(artista)

                if (resultArtista)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para listar todos artistas
const listarArtista = async function() {
    try {
        let dadosArtista = {}
        let resultArtista = await artistaDAO.selectAllArtista()

        if (resultArtista != false) {
            if (resultArtista.length > 0) {
                dadosArtista.status = true
                dadosArtista.status_code = 200
                dadosArtista.itens = resultArtista.length
                dadosArtista.artistas = resultArtista
                return dadosArtista
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para buscar um artista pelo id 
const buscarArtista = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        } else {
            let dadosArtista = {}
            let resultArtista = await artistaDAO.selectByIdArtista(id)

            if (resultArtista && typeof resultArtista === 'object') {
                dadosArtista.status = true
                dadosArtista.status_code = 200
                dadosArtista.artista = resultArtista
                return dadosArtista //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para excluir um artista
const excluirArtista = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        } else {
            let resultArtista = await buscarArtista(id)

            if (resultArtista.status_code == 200) {
                let result = await artistaDAO.deletArtista(id)
                if (result) {
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else if (resultArtista.status_code == 404) {
                return MESSAGE.ERROR_NOT_FOUND //404
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para atualizar um artista
const atualizarArtista = async function(artista, id, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                artista.nome == undefined || artista.nome == '' || artista.nome == null || artista.nome.length > 100 ||
                artista.biografia == undefined || artista.biografia == '' || artista.biografia == null ||
                artista.foto_perfil == undefined || artista.foto_perfil == '' || artista.foto_perfil == null || artista.foto_perfil.length > 200 ||
                artista.pais_origem == undefined || artista.pais_origem == '' || artista.pais_origem == null || artista.pais_origem.length > 100 ||
                id == undefined || id == '' || id == null || isNaN(id) || id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIEDLS //400
            } else {
                let resultArtista = await buscarArtista(id)

                if (resultArtista.status_code == 200) {
                    artista.id = id
                    let result = await artistaDAO.updateArtista(artista)

                    if (result) {
                        return MESSAGE.SUCCESS_UPDATE_ITEM //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else if (resultArtista.status_code == 404) {
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
    inserirArtista,
    listarArtista,
    buscarArtista,
    excluirArtista,
    atualizarArtista
}