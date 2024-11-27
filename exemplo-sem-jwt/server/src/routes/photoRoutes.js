// Importa o framework Express para gerenciar as rotas da aplicação
const express = require('express');

// Importa o controlador de fotos, que contém a lógica para lidar com as operações relacionadas às fotos
const PhotoController = require('../controllers/PhotoController');

// Importa os middlewares para validação dos dados ao criar ou atualizar fotos
const { validateCreatePhoto, validateUpdatePhoto } = require('../middlewares/photoMiddleware');

// Cria uma instância do roteador do Express, que será usada para definir as rotas deste módulo
const router = express.Router();

/* 
 * Define as rotas e seus respectivos métodos HTTP, middlewares e controladores.
 */

// Rota para criar uma nova foto
// Método POST: recebe os dados da nova foto no corpo da requisição, valida com o middleware `validateCreatePhoto` 
// e passa para o controlador `PhotoController.createPhoto`.
router.post('/', validateCreatePhoto, PhotoController.createPhoto);

// Rota para buscar todas as fotos
// Método GET: retorna todas as fotos chamando o controlador `PhotoController.getPhotos`.
router.get('/', PhotoController.getPhotos);

// Rota para buscar uma foto por ID
// Método GET: busca uma foto específica pelo ID fornecido como parâmetro na URL, utilizando `PhotoController.getPhotoById`.
router.get('/:id', PhotoController.getPhotoById);

// Rota para atualizar uma foto por ID
// Método PUT: recebe os novos dados no corpo da requisição, valida com o middleware `validateUpdatePhoto`,
// e atualiza a foto com o ID fornecido na URL chamando `PhotoController.updatePhoto`.
router.put('/:id', validateUpdatePhoto, PhotoController.updatePhoto);

// Rota para deletar uma foto por ID
// Método DELETE: remove a foto correspondente ao ID fornecido na URL chamando `PhotoController.deletePhoto`.
router.delete('/:id', PhotoController.deletePhoto);

// Exporta o roteador para que ele possa ser usado em outras partes da aplicação
module.exports = router;
