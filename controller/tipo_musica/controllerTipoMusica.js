/**************************************************************************************
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de tipo de música
 * Data: 22/05/2025
 * Autor: Bruno Dias
 * Versão: 1.0
 *************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const tipoMusicaDAO = require('../../model/DAO/tipo_musica.js')

const inserirTipoMusica = async function(tipoMusica, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!tipoMusica.tipo || tipoMusica.tipo.length > 50) {
                return MESSAGE.ERROR_REQUIRED_FIEDLS // 400
            } else {
                const result = await tipoMusicaDAO.insertTipoMusica(tipoMusica)
                if (result)
                    return MESSAGE.SUCCESS_CREATED_ITEM // 201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.error("Erro no controller inserirTipoMusica:", error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const listarTipoMusica = async function() {
    try {
        let dados = {}
        let result = await tipoMusicaDAO.selectAllTiposMusica()

        if (!result) return MESSAGE.ERROR_INTERNAL_SERVER_MODEL

        if (result.length > 0) {
            dados.status = true
            dados.status_code = 200
            dados.itens = result.length
            dados.tipos_musica = result
            return dados
        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        console.error("Erro no controller listarTipoMusica:", error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarTipoMusica = async function(id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIEDLS // 400
        } else {
            let dados = {}
            let result = await tipoMusicaDAO.selectTipoMusicaById(id)

            if (result && typeof result === 'object') {
                dados.status = true
                dados.status_code = 200
                dados.tipo_musica = result
                return dados
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        console.error("Erro no controller buscarTipoMusica:", error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirTipoMusica = async function(id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIEDLS // 400
        } else {
            let resultBusca = await buscarTipoMusica(id)

            if (resultBusca.status_code === 200) {
                let result = await tipoMusicaDAO.deleteTipoMusica(id)
                return result ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            } else if (resultBusca.status_code === 404) {
                return MESSAGE.ERROR_NOT_FOUND
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    } catch (error) {
        console.error("Erro no controller excluirTipoMusica:", error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarTipoMusica = async function(tipoMusica, id, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!tipoMusica.tipo || tipoMusica.tipo.length > 50) {
                return MESSAGE.ERROR_REQUIRED_FIEDLS // 400
            } else {
                let resultBusca = await buscarTipoMusica(id)

                if (resultBusca.status_code === 200) {
                    tipoMusica.id = id
                    let result = await tipoMusicaDAO.updateTipoMusica(tipoMusica)

                    return result ? MESSAGE.SUCCESS_UPDATE_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                } else if (resultBusca.status_code === 404) {
                    return MESSAGE.ERROR_NOT_FOUND
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.error("Erro no controller atualizarTipoMusica:", error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirTipoMusica,
    listarTipoMusica,
    buscarTipoMusica,
    excluirTipoMusica,
    atualizarTipoMusica
}
