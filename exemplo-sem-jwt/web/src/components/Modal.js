"use client"; // Indica que este é um componente do lado do cliente, que será executado no navegador

import { useState, useEffect } from 'react'; // Importa os hooks useState e useEffect do React

// Definição do componente Modal
export default function Modal({ isOpen, onClose, onSubmit, photo }) {
  // useState é usado para gerenciar os estados do título, URL e ID do usuário
  const [title, setTitle] = useState(''); // Inicializa o título da foto como uma string vazia
  const [url, setUrl] = useState(''); // Inicializa a URL da foto como uma string vazia
  const [userId, setUserId] = useState(3); // Define o ID do usuário, inicialmente com valor fixo 3 (substituir por ID real)

  // useEffect é executado toda vez que o valor de "photo" mudar
  useEffect(() => {
    // Se "photo" estiver disponível (quando editando), preenche os campos com os valores da foto
    if (photo) {
      setTitle(photo.title); // Define o título com o valor de photo.title
      setUrl(photo.url); // Define a URL com o valor de photo.url
      setUserId(photo.userId); // Define o ID do usuário com o valor de photo.userId
    } else {
      // Se não houver foto (quando for para adicionar uma nova), limpa os campos
      setTitle('');
      setUrl('');
      setUserId(3); // Resetando para o ID padrão quando for adicionar nova foto
    }
  }, [photo]); // O useEffect depende de "photo", ou seja, ele é executado sempre que "photo" mudar

  // Função de envio do formulário, chamada ao submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)
    // Chama a função onSubmit passando o título, URL e userId como dados
    onSubmit({ title, url, userId });
    onClose(); // Fecha o modal após o envio dos dados
  };

  // Se o modal não estiver aberto, retorna "null", ou seja, não renderiza nada
  if (!isOpen) return null;

  return (
    // Modal centralizado na tela com fundo semi-transparente
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        {/* Exibe o título do modal dependendo se está editando ou adicionando uma nova foto */}
        <h2 className="text-xl font-bold mb-4">{photo ? 'Editar Foto' : 'Adicionar Nova Foto'}</h2>
        
        {/* Formulário para adicionar ou editar a foto */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Campo de entrada para o título da foto */}
          <input
            type="text"
            placeholder="Título da Foto"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Atualiza o título ao digitar
            className="p-2 border border-gray-300 rounded"
            required
          />
          {/* Campo de entrada para a URL da foto */}
          <input
            type="url"
            placeholder="URL da Foto"
            value={url}
            onChange={(e) => setUrl(e.target.value)} // Atualiza a URL ao digitar
            className="p-2 border border-gray-300 rounded"
            required
          />
          {/* Botão para submeter o formulário */}
          <button type="submit" className="bg-blue-500 text-white rounded py-2">Salvar</button>
        </form>
        
        {/* Botão para fechar o modal sem fazer alterações */}
        <button onClick={onClose} className="mt-4 text-red-500">Fechar</button>
      </div>
    </div>
  );
}
