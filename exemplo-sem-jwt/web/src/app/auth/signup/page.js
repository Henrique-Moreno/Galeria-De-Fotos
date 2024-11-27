"use client"; // Indica que este código é executado no lado do cliente

import { useState } from 'react'; // Hook para gerenciar o estado local no componente
import { UserPlus } from 'lucide-react'; // Ícone do Lucide para o botão de criar conta
import { useRouter } from 'next/navigation'; // Hook do Next.js para navegação entre páginas

export default function Signup() {
  // Definição dos estados locais para armazenar os dados do formulário
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Hook de navegação do Next.js para redirecionamento após o registro
  const router = useRouter();

  // Função que será chamada quando o formulário for enviado
  const handleSignup = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Envia os dados de registro para a API (cadastra o usuário)
    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST', // Define o método HTTP como POST
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify({ username, email, password }), // Envia os dados do formulário como um objeto JSON
    });

    // Verifica se o registro foi bem-sucedido
    if (response.ok) {
      router.push('/auth/login'); // Redireciona para a página de login se o registro for bem-sucedido
    } else {
      console.error('Erro ao criar conta'); // Exibe um erro no console se a resposta da API não for ok
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 text-center">
      {/* Título da página */}
      <h1 className="text-4xl font-bold text-foreground">Criar Conta</h1>

      {/* Formulário de cadastro */}
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full max-w-sm">
        {/* Campo para o nome de usuário */}
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Atualiza o estado do nome de usuário
          className="p-2 border border-gray-300 rounded"
          required // O campo é obrigatório
        />
        
        {/* Campo para o email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
          className="p-2 border border-gray-300 rounded"
          required // O campo é obrigatório
        />
        
        {/* Campo para a senha */}
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
          className="p-2 border border-gray-300 rounded"
          required // O campo é obrigatório
        />
        
        {/* Botão para submeter o formulário */}
        <button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] h-10">
          <UserPlus className="w-4 h-4" /> {/* Ícone de adicionar usuário */}
          Criar Conta
        </button>
      </form>

      {/* Link para a página de login caso o usuário já tenha uma conta */}
      <p>
        Já tem uma conta?{' '}
        <a href="/auth/login" className="text-blue-500 hover:underline">Faça Login</a>
      </p>
    </div>
  );
}