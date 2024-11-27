"use client"; // Para indicar que este é um componente do lado do cliente

import { useState, useEffect } from 'react'; // Importa hooks do React para gerenciar estado e efeitos colaterais
import Modal from '@/components/Modal'; // Importa o componente de modal
import FadingText from '@/components/FadingText'; // Importa o componente que exibe textos com efeito de fade

export default function Dashboard() {
  // Estado para controlar se o modal está aberto ou fechado
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para armazenar a lista de fotos
  const [photos, setPhotos] = useState([]);

  // Estado para armazenar a foto que está sendo editada
  const [editingPhoto, setEditingPhoto] = useState(null);

  // Array de textos que serão exibidos com o efeito de fade
  const texts = [
    'Capture momentos incríveis! 📸',
    'Compartilhe suas memórias com a galeria! 🌟'
  ];

  // Hook useEffect que é executado quando o componente é montado (simula um componentDidMount)
  useEffect(() => {
    fetchPhotos(); // Carrega as fotos ao iniciar o componente
  }, []); // O array vazio significa que a função só será chamada uma vez (no carregamento inicial)

  // Função para buscar as fotos da API
  const fetchPhotos = async () => {
    const response = await fetch('http://localhost:3000/api/photos'); // Faz uma requisição GET para obter as fotos
    if (response.ok) {
      const data = await response.json(); // Converte a resposta em JSON
      setPhotos(data); // Atualiza o estado com a lista de fotos recebidas
    } else {
      console.error('Erro ao buscar fotos'); // Exibe um erro se a requisição falhar
    }
  };

  // Função para abrir o modal e passar a foto para edição
  const handleOpenModal = (photo) => {
    setEditingPhoto(photo); // Define a foto a ser editada
    setIsModalOpen(true); // Abre o modal
  };

  // Função para fechar o modal e resetar a foto sendo editada
  const handleCloseModal = () => {
    setIsModalOpen(false); // Fecha o modal
    setEditingPhoto(null); // Limpa o estado da foto sendo editada
  };

  // Função para adicionar uma nova foto através da API
  const handleAddPhoto = async (photoData) => {
    const response = await fetch('http://localhost:3000/api/photos', {
      method: 'POST', // Método POST para criar uma nova foto
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify(photoData), // Converte os dados da foto para JSON e envia no corpo da requisição
    });

    if (response.ok) {
      fetchPhotos(); // Atualiza a lista de fotos após adicionar a nova foto
    } else {
      console.error('Erro ao adicionar foto'); // Exibe um erro caso a requisição falhe
    }
  };

  // Função para editar uma foto existente
  const handleEditPhoto = async (photoData) => {
    const response = await fetch(`http://localhost:3000/api/photos/${editingPhoto.id}`, {
      method: 'PUT', // Método PUT para atualizar a foto existente
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify(photoData), // Converte os dados da foto para JSON e envia no corpo da requisição
    });

    if (response.ok) {
      fetchPhotos(); // Atualiza a lista de fotos após editar
      handleCloseModal(); // Fecha o modal após editar a foto
    } else {
      console.error('Erro ao editar foto'); // Exibe um erro caso a requisição falhe
    }
  };

  // Função para deletar uma foto
  const handleDeletePhoto = async (id) => {
    const response = await fetch(`http://localhost:3000/api/photos/${id}`, {
      method: 'DELETE', // Método DELETE para remover a foto
    });

    if (response.ok) {
      fetchPhotos(); // Atualiza a lista de fotos após deletar
    } else {
      console.error('Erro ao deletar foto'); // Exibe um erro caso a requisição falhe
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 text-center">
      <h1 className="text-4xl font-bold text-foreground">Sua Galeria de Fotos</h1>

      {/* Exibe o texto animado com efeito de fade */}
      <FadingText texts={texts} />

      {/* Botão para criar uma nova foto, abre o modal sem foto para edição */}
      <button
        onClick={() => handleOpenModal(null)}
        className="bg-blue-500 text-white rounded-lg py-2 px-4 shadow hover:bg-blue-600 transition"
      >
        Criar Nova Foto
      </button>

      {/* Componente Modal que é exibido quando isModalOpen é true */}
      <Modal
        isOpen={isModalOpen} // Determina se o modal está aberto
        onClose={handleCloseModal} // Função chamada para fechar o modal
        onSubmit={editingPhoto ? handleEditPhoto : handleAddPhoto} // Função chamada ao submeter o formulário no modal (edit ou add)
        photo={editingPhoto} // Foto a ser editada (se houver)
      />

      {/* Lista de fotos exibidas como cartões */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-screen-md">
        {photos.map(photo => (
          <div key={photo.id} className="border rounded-lg p-4 shadow">
            <img src={photo.url} alt={photo.title} className="rounded mb-2" />
            <h3 className="font-bold">{photo.title}</h3>
            <div className="flex justify-between mt-2">
              {/* Botão para abrir o modal e editar a foto */}
              <button
                onClick={() => handleOpenModal(photo)} // Passa a foto para editar
                className="bg-blue-500 text-white rounded-lg py-1 px-3 hover:bg-blue-600 transition"
              >
                Editar
              </button>
              {/* Botão para deletar a foto */}
              <button
                onClick={() => handleDeletePhoto(photo.id)}
                className="bg-red-500 text-white rounded-lg py-1 px-3 hover:bg-red-600 transition"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
