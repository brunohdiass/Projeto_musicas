/***********************************************************************************
 * Objetivo: Arquivo de configuracao do projeto, onde teremos mensagens padronizadas,
 *           variaveis e constante para o projeto.
 * Data: 13/02/25
 * Autor: Bruno dias
 * Versão: 1.0
 **********************************************************************************/

/**********************MENSAGENS DE STATUS CODE PARA API**********************/


/**********************MENSAGENS DE ERRO**************************************/
const ERROR_REQUIRED_FIEDLS             = {status: false, status_code:400, message:'Existem campos com preenchimentos obrigatórios que não foram encaminhados.'}
const ERROR_INTERNAL_SERVER_MODEL       = {status: false, status_code:500, message:'Devido a um erro interno no servidor de modelagem de dados não foi possivel processar a requisição, não foi possivel processar a requisição'}
const ERROR_INTERNAL_SERVER_CONTROLLER  = {status: false, status_code:500, message:'Devido a erro interno no servidor de controler de dados não foi possivel processar a requisição , não foi possivel processar a requisição'}
const ERROR_CONTENT_TYPE                = {status: false, status_code:415, message:'Não foi possivel processar a requisição pois o tipo de dados encaminhado não é aceito na API. Você deve encaminhar apenas JSON'}
const ERROR_NOT_FOUND                   = {status: false, status_code:404, message:'Não foram encontrados itens para retorno'}
/***********************MENSAGENS DE SUCESSO********************************* */
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message:'Item criado com sucesso!'}
const SUCCESS_DELETED_ITEM = {status: true, status_code: 200, message:'Item excluido com sucesso!'}
const SUCCESS_UPDATE_ITEM = {status: true, status_code: 200, message:'Item atualizado com sucesso!'}

module.exports = {
    ERROR_REQUIRED_FIEDLS,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATE_ITEM
}