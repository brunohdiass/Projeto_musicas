/**************************************************************************************
 * Objetivo: Controller responsavel pela manipulação do CRUD de dados de música
 * Data: 13/02/25
 * Autor: Bruno Dias
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




// Função para inserir um gênero
const inserirGenero1 = async function(genero, contentType){
    try{

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( 
                genero.nome               == undefined || genero.nome == ''              || genero.nome == null            || genero.nome.length > 80            
               
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS //400
            }else{
                let resultMusica = await musicaDAO.insertGenero1(genero)
    
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

//Função para listar todos generos
const listarGenero = async function(){

    try {

        let dadosGenero = {}

        //Chamar a função que retorna todas as musicas
        let resultGenero = await musicaDAO.selectAllGenero()

        if (resultGenero != false){
            if(resultGenero.length > 0){
                //Criando um JSON para retornar a lista de musicas
                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.itens = resultGenero.length
                dadosGenero.musics = resultGenero
    
                return dadosGenero
    
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

//Função para excluir um genero
const excluirGenero = async function(id){
    try {
        if(id =='' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        }else{
            //Validar se o id existe
            let resultGenero = await buscarGenero(id)

            if (resultGenero.status_code == 200){
                //Delete
                let result = await musicaDAO.deletGenero(id)
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

//Função para buscar um genero pelo id 
const buscarGenero = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIEDLS // 400
        } else {
            let dadosGenero = {}
            let resultGenero = await musicaDAO.selectByIdGenero(id)

            if (resultGenero != false && typeof(resultGenero) == 'object') {
                if (resultGenero.length > 0) {
                    dadosGenero.status = true
                    dadosGenero.status_code = 200
                    dadosGenero.generos = resultGenero
                    return dadosGenero // 200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para atualizar um genero
const atualizarGenero = async function(genero, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( 
                    genero.nome               == undefined || genero.nome == ''              || genero.nome == null            || genero.nome.length > 80            
                   
                    
                
                ){
                    return MESSAGE.ERROR_REQUIRED_FIEDLS //400
                }else{
                    // validar se o id existe no banco bd

                    let resultGenero = await buscarGenero(id)

                    if (resultGenero.status_code == 200){
                        //update
                        // Adiciona o atributo ID no JSON e coloca o id da musica que chegou na controller 
                        genero.id = id
                        let result = await musicaDAO.updateGenero(genero)

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







//artista
// Função para inserir um artista
const inserirArtista = async function(artista, contentType){
    try{

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( 
                artista.nome               == undefined || artista.nome == ''              || artista.nome == null            || artista.nome.length > 80            
               
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS //400
            }else{
                let resultArtista = await musicaDAO.inserirArtista(artista)
    
                if(resultArtista)
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

const listarArtista = async function() {
    try {
        let dadosArtista = {}

        // Chamar a função que retorna todos os artistas
        let resultArtista = await musicaDAO.selectAllArtista()

        if (resultArtista != false) {
            if (resultArtista.length > 0) {
                // Criando um JSON para retornar a lista de artistas
                dadosArtista.status = true
                dadosArtista.status_code = 200
                dadosArtista.itens = resultArtista.length
                dadosArtista.artistas = resultArtista

                return dadosArtista
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
//Função para buscar um genero pelo id 
const buscarArtista = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIEDLS // 400
        } else {
            let dadosArtista = {}
            let resultArtista = await musicaDAO.selectByIdArtista(id)

            if (resultArtista && typeof resultArtista === 'object') {
                dadosArtista.status = true
                dadosArtista.status_code = 200
                dadosArtista.artista = resultArtista
                return dadosArtista // 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
//Função para excluir um genero
const excluirArtista = async function(id){
    try {
        if(id =='' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        }else{
            //Validar se o id existe
            let resultArtista = await buscarArtista(id)

            if (resultArtista.status_code == 200){
                //Delete
                let result = await musicaDAO.deletArtista(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }

            }else if (resultArtista.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
        
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para atualizar um genero
const atualizarArtista = async function(artista, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (
                    artista.nome == undefined || artista.nome == '' || artista.nome == null || artista.nome.length > 100 ||
                    artista.biografia == undefined || artista.biografia == '' || artista.biografia == null ||
                    artista.foto_perfil == undefined || artista.foto_perfil == '' || artista.foto_perfil == null || artista.foto_perfil.length > 200 ||
                    artista.pais_origem == undefined || artista.pais_origem == '' || artista.pais_origem == null || artista.pais_origem.length > 100 ||
                    id == undefined || id == '' || id == null || isNaN(id) || id <= 0
                ) {
                    return MESSAGE.ERROR_REQUIRED_FIEDLS // 400
                }else{
                    // validar se o id existe no banco bd

                    let resultArtista = await buscarArtista(id)

                    if (resultArtista.status_code == 200){
                        //update
                        // Adiciona o atributo ID no JSON e coloca o id da musica que chegou na controller 
                        artista.id = id
                        let result = await musicaDAO.updateArtista(artista)

                        if(result){
                            return MESSAGE.SUCCESS_UPDATE_ITEM //200
                        }else{
                            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                        }

                    }else if (resultArtista.status_code == 404){
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





//playlist

const inserirPlaylist = async function(playlist, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                playlist.titulo        == undefined || playlist.titulo == ''        || playlist.titulo == null        || playlist.titulo.length > 100 ||
                playlist.descricao     == undefined || playlist.descricao == ''     || playlist.descricao == null     ||
                playlist.data_criacao  == undefined || playlist.data_criacao == ''  || playlist.data_criacao == null  ||
                playlist.imagem        == undefined || playlist.imagem == ''        || playlist.imagem == null        || playlist.imagem.length > 200
            ) {
                return MESSAGE.ERROR_REQUIRED_FIEDLS; // 400
            } else {
                let resultPlaylist = await musicaDAO.inserirPlaylist(playlist);

                if (resultPlaylist)
                    return MESSAGE.SUCCESS_CREATED_ITEM; // 201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

const listarPlaylist = async function() {
    try {
        let dadosPlaylist = {};

        // Chama a função que retorna todas as playlists
        let resultPlaylist = await musicaDAO.selectAllPlaylist();

        if (resultPlaylist != false) {
            dadosPlaylist.status = true;
            dadosPlaylist.status_code = 200;
            dadosPlaylist.itens = resultPlaylist.length;
            dadosPlaylist.playlists = resultPlaylist;

            return dadosPlaylist;
        } else {
            return MESSAGE.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.error('Erro no controller - listarPlaylist:', error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

const buscarPlaylist = async function(id) {
    try {
        // Validação do ID
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIEDLS; // 400
        } else {
            let dadosPlaylist = {};
            let resultPlaylist = await musicaDAO.selectByIdPlaylist(id);

            if (resultPlaylist && typeof resultPlaylist === 'object') {
                dadosPlaylist.status = true;
                dadosPlaylist.status_code = 200;
                dadosPlaylist.playlist = resultPlaylist;
                return dadosPlaylist; // 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};
const excluirPlaylist = async function(id){
    try {
        if(id =='' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        }else{
            //Validar se o id existe
            let resultPlaylist = await buscarPlaylist(id)

            if (resultPlaylist.status_code == 200){
                //Delete
                let result = await musicaDAO.deletPlaylist(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }

            }else if (resultPlaylist.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
        
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const atualizarPlaylist = async function(playlist, id, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                playlist.titulo == undefined || playlist.titulo == '' || playlist.titulo == null || playlist.titulo.length > 100 ||
                playlist.descricao == undefined || playlist.descricao == '' || playlist.descricao == null ||
                playlist.foto_capa == undefined || playlist.foto_capa == '' || playlist.foto_capa == null || playlist.foto_capa.length > 200 ||
                id == undefined || id == '' || id == null || isNaN(id) || id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIEDLS; // 400
            } else {
                // Validar se o ID existe no banco de dados
                let resultPlaylist = await buscarPlaylist(id); // Função que busca a playlist pelo ID

                if (resultPlaylist.status_code === 200) {
                    // Adiciona o ID ao objeto para o update
                    playlist.id = id;

                    // Realiza o update
                    let result = await musicaDAO.updatePlaylist(playlist);

                    if (result) {
                        return MESSAGE.SUCCESS_UPDATE_ITEM; // 200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
                    }
                } else if (resultPlaylist.status_code === 404) {
                    return MESSAGE.ERROR_NOT_FOUND; // 404
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

















module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica,



    //genero
    inserirGenero1,
    listarGenero,
    excluirGenero,
    buscarGenero,
    atualizarGenero,



//artista
    inserirArtista,
    listarArtista,
    buscarArtista,
    excluirArtista,
    atualizarArtista,



//playlist
    inserirPlaylist,
    listarPlaylist,
    buscarPlaylist,
    excluirPlaylist,
    atualizarPlaylist

}