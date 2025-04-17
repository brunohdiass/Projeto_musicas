/**************************************************************************************
 * Objetivo: Controller responsavel pela manipulação do CRUD de dados de música
 * Data: 13/02/25
 * Autor: Kaike Bueno
 * Versão: 1.0
 *************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const musicaDAO = require('../../model/DAO/musica.js')
//Função para inserir uma musica
const inserirMusica = async function(musica, contentType){
    try{

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( 
                musica.nome               == undefined || musica.nome == ''              || musica.nome == null            || musica.nome.length > 80            ||
                musica.link              == undefined  || musica.link == ''              || musica.link == null            || musica.link.length > 200           ||
                musica.duracao           == undefined  || musica.duracao == ''           || musica.duracao == null         || musica.duracao.length > 5          ||
                musica.data_lancamento   == undefined  || musica.data_lancamento == ''   || musica.data_lancamento == null || musica.data_lancamento.length > 10 ||
                musica.foto_capa         == undefined  || musica.foto_capa.length > 200  ||
                musica.letra             == undefined
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS //400
            }else{
                let resultMusica = await musicaDAO.insertMusica(musica)
    
                if(resultMusica)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }
       
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}


//Função para atualizar uma musica
const atualizarMusica = async function(musica, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( 
                    musica.nome               == undefined || musica.nome == ''              || musica.nome == null            || musica.nome.length > 80            ||
                    musica.link              == undefined  || musica.link == ''              || musica.link == null            || musica.link.length > 200           ||
                    musica.duracao           == undefined  || musica.duracao == ''           || musica.duracao == null         || musica.duracao.length > 5          ||
                    musica.data_lancamento   == undefined  || musica.data_lancamento == ''   || musica.data_lancamento == null || musica.data_lancamento.length > 10 ||
                    musica.foto_capa         == undefined  || musica.foto_capa.length > 200  ||
                    musica.letra             == undefined  ||
                    id =='' || id == undefined || id == null || isNaN(id) || id <= 0
                    
                
                ){
                    return MESSAGE.ERROR_REQUIRED_FIEDLS //400
                }else{
                    // validar se o id existe no banco bd

                    let resultMusica = await buscarMusica(id)

                    if (resultMusica.status_code == 200){
                        //update
                        // Adiciona o atributo ID no JSON e coloca o id da musica que chegou na controller 
                        musica.id = id
                        let result = await musicaDAO.updateMusica(musica)

                        if(result){
                            return MESSAGE.SUCCESS_UPDATE_ITEM //200
                        }else{
                            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                        }

                    }else if (resultMusica.status_code == 404){
                        return MESSAGE.ERROR_NOT_FOUND //404
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                    }
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE //415
            }
        
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


//Função para excluir uma musica
const excluirMusica = async function(id){
    try {
        if(id =='' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        }else{
            //Validar se o id existe
            let resultMusica = await buscarMusica(id)

            if (resultMusica.status_code == 200){
                //Delete
                let result = await musicaDAO.deletMusica(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }

            }else if (resultMusica.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
        
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}


//Função para listar todas as musica
const listarMusica = async function(){

    try {

        let dadosMusica = {}

        //Chamar a função que retorna todas as musicas
        let resultMusica = await musicaDAO.selectAllMusica()

        if (resultMusica != false){
            if(resultMusica.length > 0){
                //Criando um JSON para retornar a lista de musicas
                dadosMusica.status = true
                dadosMusica.status_code = 200
                dadosMusica.itens = resultMusica.length
                dadosMusica.musics = resultMusica
    
                return dadosMusica
    
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
        

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}


//Função para buscar uma musica pelo id 
const buscarMusica = async function(id){
    try {
        if(id =='' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        }else{
            let dadosMusica = {}
            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if (resultMusica != false || typeof(resultMusica) == 'objec'){
                if(resultMusica.length > 0){
                    //Criando um JSON para retornar a lista de musicas
                    dadosMusica.status = true
                    dadosMusica.status_code = 200
                    dadosMusica.musics = resultMusica
                    return dadosMusica //200
                    
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}