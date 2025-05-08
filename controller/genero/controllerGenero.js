/**************************************************************************************
 * Objetivo: Controller responsável pela manipulação do CRUD de dados de gênero
 * Data: 13/02/25
 * Autor: Bruno Dias
 * Versão: 1.0
 *************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const generoDAO = require('../../model/DAO/genero.js')

const inserirGenero = async function(genero, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!genero.nome || genero.nome.length > 80) {
                return MESSAGE.ERROR_REQUIRED_FIEDLS; // 400
            } else {
                const resultGenero = await generoDAO.insertGenero(genero);

                if (resultGenero)
                    return MESSAGE.SUCCESS_CREATED_ITEM; // 201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.error("Erro no controller inserirGenero:", error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

const listarGenero = async function() {
    try {
        let dadosGenero = {}
        let resultGenero = await generoDAO.selectAllGeneros()

        if (!resultGenero) {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }

        if (resultGenero.length > 0) {
            dadosGenero.status = true
            dadosGenero.status_code = 200
            dadosGenero.itens = resultGenero.length
            dadosGenero.generos = resultGenero
            return dadosGenero
        } else {
            return MESSAGE.ERROR_NOT_FOUND //404
        }
    } catch (error) {
        console.error("Erro no controller listarGenero:", error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirGenero = async function(id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        } else {
            let resultGenero = await buscarGenero(id)

            if (resultGenero.status_code == 200) {
                let result = await generoDAO.deleteGenero(id)
                if (result) {
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else if (resultGenero.status_code == 404) {
                return MESSAGE.ERROR_NOT_FOUND //404
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        console.error("Erro no controller excluirGenero:", error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarGenero = async function(id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        } else {
            let dadosGenero = {}
            let resultGenero = await generoDAO.selectGeneroById(id)

            if (resultGenero && typeof(resultGenero) === 'object') {
                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.generos = resultGenero
                return dadosGenero //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }
    } catch (error) {
        console.error("Erro no controller buscarGenero:", error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const atualizarGenero = async function(genero, id, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!genero.nome || genero.nome.length > 80) {
                return MESSAGE.ERROR_REQUIRED_FIEDLS //400
            } else {
                let resultGenero = await buscarGenero(id)

                if (resultGenero.status_code == 200) {
                    genero.id = id
                    let result = await generoDAO.updateGenero(genero)

                    if (result) {
                        return MESSAGE.SUCCESS_UPDATE_ITEM //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else if (resultGenero.status_code == 404) {
                    return MESSAGE.ERROR_NOT_FOUND //404
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.error("Erro no controller atualizarGenero:", error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirGenero,
    listarGenero,
    excluirGenero,
    buscarGenero,
    atualizarGenero
}
