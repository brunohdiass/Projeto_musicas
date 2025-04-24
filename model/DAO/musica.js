/***********************************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados de musica no banco de dados
 * Data: 13/02/25
 * Autor: Bruno Dias
 * Versão: 1.0
 **********************************************************************************/

//Import da biblioteca do prisma/client
const { PrismaClient } = require('@prisma/client')

//Instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//Função para inserir uma nova musica no banco de dados
const insertMusica = async function(musica){

    try{

    
       

        let sql = `insert into tbl_musica ( nome,
                                            link,
                                            duracao,
                                            data_lancamento,
                                            foto_capa,
                                            letra
                                        ) 
                                        
                                values (
                                            '${musica.nome}',
                                            '${musica.link}',
                                            '${musica.duracao}',
                                            '${musica.data_lancamento}',
                                            '${musica.foto_capa}',
                                            '${musica.letra}'
                                        )`


        //Executa o script SQL no Banco de Dados e aguarda o retorno do mesmo
        let result = await prisma.$executeRawUnsafe(sql)

            

        if(result){
            return true
        }else{
            return false
        }
    } catch (error){
        return false
    }
    

}

//Função para atualizar uma musica exstente no banco de dados
const updateMusica = async function(musica){
try {
    let sql = `update tbl_musica set        nome            = '${musica.nome}',
                                            link            = '${musica.link}',
                                            duracao         = '${musica.duracao}',
                                            data_lancamento = '${musica.data_lancamento}',
                                            foto_capa       = '${musica.foto_capa}',
                                            letra           = '${musica.letra}'
                        where id= ${musica.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false
} catch (error) {
    return false
}
}

//Função para deletar uma musica existente no banco de dados
const deletMusica = async function(id){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'delete  from tbl_musica where id='+id

        let result = await prisma.$executeRawUnsafe(sql)
       
        if(result)
            return true
        else
            return false
    } catch (error) {(error)
        return false
        
    }
}

//Função para retornar todas as musicas cadastradas no banco de dados
const selectAllMusica = async function(){
    try{

        //Script SQL
        let sql = 'select * from tbl_musica order by id desc'

        //Executa o script SQL no banco de dados e aguarda o retorno de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result){
            return result
        }else{
            return false
        }

    } catch(error){
        return false
    }
}

//Função para buscar uma musica pelo id no banco de dados
const selectByIdMusica = async function(id){

    try{

        //Script SQL
        let sql = 'select * from tbl_musica where id='+id

        //Executa o script SQL no banco de dados e aguarda o retorno de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length >= 0){
            return result
        }else{
            return false
        }

    } catch(error){
        return false
    }
}






//genero

const insertGenero1 = async function(genero){

    try{

    
       

        let sql = `insert into tbl_genero ( nome
                                        
                                        ) 
                                        
                                values (
                                            '${genero.nome}'
                                          
                                        )`


        //Executa o script SQL no Banco de Dados e aguarda o retorno do mesmo
        let result = await prisma.$executeRawUnsafe(sql)

            

        if(result){
            return true
        }else{
            return false
        }
    } catch (error){
        return false
    }
    

}
//Função para retornar todas as musicas cadastradas no banco de dados
const selectAllGenero = async function(){
    try{

        //Script SQL
        let sql = 'select * from tbl_genero order by id desc'

        //Executa o script SQL no banco de dados e aguarda o retorno de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result){
            return result
        }else{
            return false
        }

    } catch(error){
        return false
    }
}

const deletGenero = async function(id){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'delete  from tbl_genero where id='+id

        let result = await prisma.$executeRawUnsafe(sql)
       
        if(result)
            return true
        else
            return false
    } catch (error) {(error)
        return false
        
    }
}
//Função para buscar uma musica pelo id no banco de dados
const selectByIdGenero = async function(id){

    try{

        //Script SQL
        let sql = 'select * from tbl_genero where id='+id

        //Executa o script SQL no banco de dados e aguarda o retorno de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length >= 0){
            return result
        }else{
            return false
        }

    } catch(error){
        return false
    }
}

//Função para atualizar uma musica exstente no banco de dados
const updateGenero = async function(genero) {
    try {
        let sql = `
            UPDATE tbl_genero 
            SET nome = '${genero.nome}'
            WHERE id = ${genero.id}
        `
    
        let result = await prisma.$executeRawUnsafe(sql)
    
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}











// artista
const inserirArtista = async function(artista) {
    try {
        let sql = `
            INSERT INTO tbl_artista (
                nome,
                biografia,
                foto_perfil,
                pais_origem
            ) VALUES (
                '${artista.nome}',
                '${artista.biografia}',
                '${artista.foto_perfil}',
                '${artista.pais_origem}'
            )
        `

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectAllArtista = async function(){
    try{

        //Script SQL
        let sql = 'select * from tbl_artista order by id desc'

        //Executa o script SQL no banco de dados e aguarda o retorno de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result){
            return result
        }else{
            return false
        }

    } catch(error){
        return false
    }
}
const selectByIdArtista = async function(id){

    try{

        //Script SQL
        let sql = 'select * from tbl_artista where id='+id

        //Executa o script SQL no banco de dados e aguarda o retorno de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length >= 0){
            return result
        }else{
            return false
        }

    } catch(error){
        return false
    }
}
const deletArtista = async function(id){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'delete  from tbl_artista where id='+id

        let result = await prisma.$executeRawUnsafe(sql)
       
        if(result)
            return true
        else
            return false
    } catch (error) {(error)
        return false
        
    }
}
const updateArtista = async function(artista) {
    try {
        let sql = `
            UPDATE tbl_artista 
            SET 
                nome = '${artista.nome}',
                biografia = '${artista.biografia}',
                foto_perfil = '${artista.foto_perfil}',
                pais_origem = '${artista.pais_origem}'
            WHERE id = ${artista.id}
        `;

        let result = await prisma.$executeRawUnsafe(sql);

        return result ? true : false;
    } catch (error) {
        return false;
    }
};





//playlist

const inserirPlaylist = async function(playlist) {
    try {
        let sql = `
            INSERT INTO tbl_playlist (
                titulo,
                descricao,
                data_criacao,
                imagem
            ) VALUES (
                '${playlist.titulo}',
                '${playlist.descricao}',
                '${playlist.data_criacao}',
                '${playlist.imagem}'
            )
        `;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Erro ao inserir playlist:', error);
        return false;
    }
};

const selectAllPlaylist = async function() {
    try {
        let sql = 'SELECT * FROM tbl_playlist ORDER BY id DESC';
        let result = await prisma.$queryRawUnsafe(sql);

        if (result) {
            return result;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Erro ao executar consulta SQL:', error);
        return false;
    }
};

const selectByIdPlaylist = async function(id) {
    try {
        // Script SQL
        let sql = 'SELECT * FROM tbl_playlist WHERE id=' + id;

        // Executa o script SQL no banco de dados e aguarda o retorno de dados
        let result = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) {
            return result;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Erro ao buscar playlist:', error);
        return false;
    }
};
const deletPlaylist = async function(id){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'delete  from tbl_playlist where id='+id

        let result = await prisma.$executeRawUnsafe(sql)
       
        if(result)
            return true
        else
            return false
    } catch (error) {(error)
        return false
        
    }
}
const updatePlaylist = async function(playlist) {
    try {
        let sql = `
            UPDATE tbl_playlist
            SET 
                titulo = '${playlist.titulo}',
                descricao = '${playlist.descricao}',
                data_criacao = '${playlist.data_criacao}',
                imagem = '${playlist.imagem}'
            WHERE id = ${playlist.id}
        `;

        let result = await prisma.$executeRawUnsafe(sql);

        return result ? true : false;
    } catch (error) {
        console.error('Erro ao atualizar playlist:', error);
        return false;
    }
};










module.exports = {
//musicas
    insertMusica,
    updateMusica,
    deletMusica,
    selectAllMusica,
    selectByIdMusica,


//artista
    inserirArtista,
    selectAllArtista,
    selectByIdArtista,
    deletArtista,
    updateArtista,


//genero
    insertGenero1,
    selectAllGenero,
    deletGenero,
    selectByIdGenero,
    updateGenero,



//playlist
    inserirPlaylist,
    selectAllPlaylist,
    selectByIdPlaylist,
    deletPlaylist,
    updatePlaylist
}