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

module.exports = {
inserirArtista,
selectAllArtista,
selectByIdArtista,
deletArtista,
updateArtista
}