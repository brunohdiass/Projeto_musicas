/*********************************************************************************************
 * Objetivo: API responsável pelas requisições do projeto de controle de músicas
 * Data: 13/02/25
 * Autor: Bruno Dias
 * Versão: 1.0
 ********************************************************************************************/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const controllerMusica = require('./controller/musica/controllerMusica.js');
const controllerGenero = require('./controller/genero/controllerGenero.js');
const controllerArtista = require('./controller/artista/controllerArtista.js');
const controllerPlaylist = require('./controller/playlist/conrollerPlaylist.js');  
const controllerTipoMusica = require('./controller/tipo_musica/controllerTipoMusica.js'); 
const controllerAlbum = require('./controller/album/controllerAlbum.js')


const app = express();

app.use(cors());
app.use(bodyParser.json());

// Middleware para configurar headers de CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// ==================== ROTAS DE MÚSICAS ====================

app.post('/v1/controle-musicas/musica', async (req, res) => {
    const result = await controllerMusica.inserirMusica(req.body, req.headers['content-type']);
    res.status(result.status_code).json(result);
});

app.get('/v1/controle-musicas/musica', async (req, res) => {
    const result = await controllerMusica.listarMusica();
    res.status(result.status_code).json(result);
});

app.get('/v1/controle-musicas/musica/:id', async (req, res) => {
    const result = await controllerMusica.buscarMusica(req.params.id);
    res.status(result.status_code).json(result);
});

app.put('/v1/controle-musicas/musica/:id', async (req, res) => {
    const result = await controllerMusica.atualizarMusica(req.body, req.params.id, req.headers['content-type']);
    res.status(result.status_code).json(result);
});

app.delete('/v1/controle-musicas/musica/:id', async (req, res) => {
    const result = await controllerMusica.excluirMusica(req.params.id);
    res.status(result.status_code).json(result);
});

// ==================== ROTAS DE GÊNEROS ====================

app.post('/v1/controle-musicas/genero', async (req, res) => {
    const result = await controllerGenero.inserirGenero(req.body, req.headers['content-type']);
    res.status(result.status_code).json(result);
});

app.get('/v1/controle-musicas/genero', async (req, res) => {
    const result = await controllerGenero.listarGenero();  // Corrigido para controllerGenero
    res.status(result.status_code).json(result);
});

app.get('/v1/controle-musicas/genero/:id', async (req, res) => {
    const result = await controllerGenero.buscarGenero(req.params.id);  // Corrigido para controllerGenero
    res.status(result.status_code).json(result);
});

app.put('/v1/controle-musicas/genero/:id', async (req, res) => {
    const result = await controllerGenero.atualizarGenero(req.body, req.params.id, req.headers['content-type']);  // Corrigido para controllerGenero
    res.status(result.status_code).json(result);
});

app.delete('/v1/controle-musicas/genero/:id', async (req, res) => {
    const result = await controllerGenero.excluirGenero(req.params.id);  // Corrigido para controllerGenero
    res.status(result.status_code).json(result);
});

// ==================== ROTAS DE ARTISTAS ====================

app.post('/v1/controle-musicas/artista', async (req, res) => {
    const result = await controllerArtista.inserirArtista(req.body, req.headers['content-type']);  // Corrigido para controllerArtista
    res.status(result.status_code).json(result);
});

app.get('/v1/controle-musicas/artista', async (req, res) => {
    const result = await controllerArtista.listarArtista();  // Corrigido para controllerArtista
    res.status(result.status_code).json(result);
});

app.get('/v1/controle-musicas/artista/:id', async (req, res) => {
    const result = await controllerArtista.buscarArtista(req.params.id);  // Corrigido para controllerArtista
    res.status(result.status_code).json(result);
});

app.put('/v1/controle-musicas/artista/:id', async (req, res) => {
    const result = await controllerArtista.atualizarArtista(req.body, req.params.id, req.headers['content-type']);  // Corrigido para controllerArtista
    res.status(result.status_code).json(result);
});

app.delete('/v1/controle-musicas/artista/:id', async (req, res) => {
    const result = await controllerArtista.excluirArtista(req.params.id);  // Corrigido para controllerArtista
    res.status(result.status_code).json(result);
});

// ==================== ROTAS DE PLAYLISTS ====================

app.post('/v1/controle-musicas/playlist', async (req, res) => {
    const result = await controllerPlaylist.inserirPlaylist(req.body, req.headers['content-type']);  // Corrigido para controllerPlaylist
    res.status(result.status_code).json(result);
});

app.get('/v1/controle-musicas/playlist', async (req, res) => {
    const result = await controllerPlaylist.listarPlaylist();  // Corrigido para controllerPlaylist
    res.status(result.status_code).json(result);
});

app.get('/v1/controle-musicas/playlist/:id', async (req, res) => {
    const result = await controllerPlaylist.buscarPlaylist(req.params.id);  // Corrigido para controllerPlaylist
    res.status(result.status_code).json(result);
});

app.put('/v1/controle-musicas/playlist/:id', async (req, res) => {
    const result = await controllerPlaylist.atualizarPlaylist(req.body, req.params.id, req.headers['content-type']);  // Corrigido para controllerPlaylist
    res.status(result.status_code).json(result);
});

app.delete('/v1/controle-musicas/playlist/:id', async (req, res) => {
    const result = await controllerPlaylist.excluirPlaylist(req.params.id);  // Corrigido para controllerPlaylist
    res.status(result.status_code).json(result);
});


// ==================== ROTAS DE TIPO DE MÚSICA ====================


app.post('/v1/controle-musicas/tipo-musica', async (req, res) => {
    const result = await controllerTipoMusica.inserirTipoMusica(req.body, req.headers['content-type'])
    res.status(result.status_code).json(result)
})

app.get('/v1/controle-musicas/tipo-musica', async (req, res) => {
    const result = await controllerTipoMusica.listarTipoMusica()
    res.status(result.status_code).json(result)
})

app.get('/v1/controle-musicas/tipo-musica/:id', async (req, res) => {
    const result = await controllerTipoMusica.buscarTipoMusica(req.params.id)
    res.status(result.status_code).json(result)
})

app.put('/v1/controle-musicas/tipo-musica/:id', async (req, res) => {
    const result = await controllerTipoMusica.atualizarTipoMusica(req.body, req.params.id, req.headers['content-type'])
    res.status(result.status_code).json(result)
})

app.delete('/v1/controle-musicas/tipo-musica/:id', async (req, res) => {
    const result = await controllerTipoMusica.excluirTipoMusica(req.params.id)
    res.status(result.status_code).json(result)
})





// ==================== ROTAS DE ÁLBUM ====================

app.post('/v1/controle-musicas/album', async (req, res) => {
    const result = await controllerAlbum.inserirAlbum(req.body, req.headers['content-type']);
    res.status(result.status_code).json(result);
});

app.get('/v1/controle-musicas/album', async (req, res) => {
    const result = await controllerAlbum.listarAlbuns();
    res.status(result.status_code).json(result);
});

app.get('/v1/controle-musicas/album/:id', async (req, res) => {
    const result = await controllerAlbum.buscarAlbum(req.params.id);
    res.status(result.status_code).json(result);
});

app.put('/v1/controle-musicas/album/:id', async (req, res) => {
    const result = await controllerAlbum.atualizarAlbum(req.body, req.params.id, req.headers['content-type']);
    res.status(result.status_code).json(result);
});

app.delete('/v1/controle-musicas/album/:id', async (req, res) => {
    const result = await controllerAlbum.excluirAlbum(req.params.id);
    res.status(result.status_code).json(result);
});







// ==================== INICIALIZAÇÃO DO SERVIDOR ====================

app.listen(8080, () => {
    console.log('Servidor aguardando novas requisições na porta 8080');
});
