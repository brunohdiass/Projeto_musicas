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
    inserirPlaylist,
    selectAllPlaylist,
    selectByIdPlaylist,
    deletPlaylist,
    updatePlaylist
}