"use client"; // Indica que o código deve ser executado no cliente (browser), necessário em Next.js com React

// Importação dos hooks e componentes necessários
import { useState } from 'react'; // Hook do React para gerenciar o estado do componente
import { LogIn } from 'lucide-react'; // Ícone de login para ser utilizado no botão
import { useRouter } from 'next/navigation'; // Hook do Next.js para navegação entre páginas

// Componente de Login
export default function Login() {
  // Declaração de estados para armazenar o email e a senha
  const [email, setEmail] = useState(''); // Gerencia o estado do email
  const [password, setPassword] = useState(''); // Gerencia o estado da senha

  // Instancia o hook useRouter para poder realizar a navegação
  const router = useRouter();

  // Função assíncrona para lidar com o login quando o formulário for enviado
  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página ao submeter o formulário

    // Faz uma requisição POST para a API de login
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST', // Método da requisição
      headers: {
        'Content-Type': 'application/json', // Tipo de conteúdo JSON
      },
      body: JSON.stringify({ email, password }), // Corpo da requisição com os dados do email e senha
    });

    // Se a resposta da requisição for bem-sucedida
    if (response.ok) {
      const data = await response.json(); // Parseia a resposta JSON
      localStorage.setItem('token', data.token); // Armazena o token de autenticação no localStorage
      router.push('/dashboard'); // Redireciona para a página de dashboard após o login bem-sucedido
    } else {
      console.error('Erro ao fazer login'); // Caso ocorra um erro no login, exibe no console
    }
  };

  // JSX do componente
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 text-center">
      {/* Título da página */}
      <h1 className="text-4xl font-bold text-foreground">Fazer Login</h1>

      {/* Formulário de login */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
        {/* Campo de email */}
        <input
          type="email" // Define o tipo do input como email
          placeholder="Email" // Placeholder para o campo
          value={email} // Valor do campo vinculado ao estado do email
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email quando o valor mudar
          className="p-2 border border-gray-300 rounded" // Estilos do campo
          required // Torna o campo obrigatório
        />

        {/* Campo de senha */}
        <input
          type="password" // Define o tipo do input como password
          placeholder="Senha" // Placeholder para o campo
          value={password} // Valor do campo vinculado ao estado da senha
          onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha quando o valor mudar
          className="p-2 border border-gray-300 rounded" // Estilos do campo
          required // Torna o campo obrigatório
        />

        {/* Botão de login */}
        <button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] h-10">
          {/* Ícone de login */}
          <LogIn className="w-4 h-4" />
          Fazer Login
        </button>
      </form>

      {/* Link para a página de cadastro caso o usuário não tenha uma conta */}
      <p>
        Não tem uma conta?{' '}
        <a href="/auth/signup" className="text-blue-500 hover:underline">Crie uma agora</a>
      </p>
    </div>
  );
}
