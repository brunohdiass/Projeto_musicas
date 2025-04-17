create database db_controle_musicas_ba;


#ativa o database a ser utilizado
use db_controle_musicas_ba;

#Cria a tabela de musica
create table tbl_musica (
  id	 			int not null auto_increment primary key,
  nome	 			varchar (100) 		 not null,
  link	 			varchar (200) 		 not null,
  duracao 			time 				 not null,
  data_lancamento	date				 not null,
  foto_capa 		varchar(200) ,
  letra 			text
);

#testando as tabelas
show tables;
desc tbl_musica;
select * from tbl_musica;
