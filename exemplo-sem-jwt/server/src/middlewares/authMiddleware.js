// Importa a biblioteca Zod para validação de esquemas (schemas)
const { z } = require('zod');

// Criação de um esquema de validação para o cadastro de usuários
const createUserSchema = z.object({
  // O campo "username" deve ser uma string com no mínimo 3 caracteres
  username: z.string().min(3),
  // O campo "email" deve ser uma string em formato de email válido
  email: z.string().email(),
  // O campo "password" deve ser uma string com no mínimo 6 caracteres
  password: z.string().min(6),
});

// Criação de um esquema de validação para o login de usuários
const loginSchema = z.object({
  // O campo "email" deve ser uma string em formato de email válido
  email: z.string().email(),
  // O campo "password" deve ser uma string com no mínimo 6 caracteres
  password: z.string().min(6),
});

// Middleware para validar os dados de criação de usuário
function validateCreateUser(req, res, next) {
  try {
    // Tenta validar o corpo da requisição usando o esquema de criação de usuário
    createUserSchema.parse(req.body);
    // Se a validação passar, continua para o próximo middleware ou rota
    next();
  } catch (err) {
    // Se a validação falhar, retorna um erro 400 com os detalhes do erro
    res.status(400).json({ error: err.errors });
  }
}

// Middleware para validar os dados de login do usuário
function validateLogin(req, res, next) {
  try {
    // Tenta validar o corpo da requisição usando o esquema de login
    loginSchema.parse(req.body);
    // Se a validação passar, continua para o próximo middleware ou rota
    next();
  } catch (err) {
    // Se a validação falhar, retorna um erro 400 com os detalhes do erro
    res.status(400).json({ error: err.errors });
  }
}

// Exporta os middlewares para serem usados em outras partes da aplicação
module.exports = { validateCreateUser, validateLogin };
