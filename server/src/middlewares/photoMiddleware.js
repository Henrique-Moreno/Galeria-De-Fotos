// Importa a biblioteca Zod, que é usada para validação de esquemas de dados
const { z } = require('zod');

// Define o esquema de validação para a criação de uma foto
// O título deve ser uma string com pelo menos 1 caractere
// A URL deve ser um endereço válido
// O userId deve ser um número inteiro
const createPhotoSchema = z.object({
  title: z.string().min(1), // Valida que o título é uma string não vazia
  url: z.string().url(),   // Valida que a URL tem um formato válido
  userId: z.number().int() // Valida que o userId é um número inteiro
});

// Define o esquema de validação para a atualização de uma foto
// O título é opcional e, se fornecido, deve ser uma string
// A URL é opcional e, se fornecida, deve ser um endereço válido
const updatePhotoSchema = z.object({
  title: z.string().optional(), // Valida que o título, se fornecido, é uma string
  url: z.string().url().optional() // Valida que a URL, se fornecida, tem um formato válido
});

// Middleware para validar os dados ao criar uma nova foto
function validateCreatePhoto(req, res, next) {
  try {
    // Verifica se os dados no corpo da requisição (req.body) estão de acordo com o esquema createPhotoSchema
    createPhotoSchema.parse(req.body);
    next(); // Se os dados forem válidos, passa para o próximo middleware ou controlador
  } catch (err) {
    // Se os dados forem inválidos, retorna uma resposta com status 400 (Bad Request) e os erros
    res.status(400).json({ error: err.errors });
  }
}

// Middleware para validar os dados ao atualizar uma foto
function validateUpdatePhoto(req, res, next) {
  try {
    // Verifica se os dados no corpo da requisição (req.body) estão de acordo com o esquema updatePhotoSchema
    updatePhotoSchema.parse(req.body);
    next(); // Se os dados forem válidos, passa para o próximo middleware ou controlador
  } catch (err) {
    // Se os dados forem inválidos, retorna uma resposta com status 400 (Bad Request) e os erros
    res.status(400).json({ error: err.errors });
  }
}

// Exporta os middlewares para que possam ser usados em outras partes do código
module.exports = { validateCreatePhoto, validateUpdatePhoto };
