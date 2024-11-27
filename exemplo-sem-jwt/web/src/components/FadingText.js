import { useState, useEffect } from 'react';

// Componente funcional FadingText que recebe 'texts' como prop
export default function FadingText({ texts }) {
  // Estado para controlar o texto exibido no momento
  const [displayText, setDisplayText] = useState('');
  // Estado para controlar o índice do texto atual da lista 'texts'
  const [index, setIndex] = useState(0);
  // Estado para controlar a visibilidade do texto (opacidade)
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Configura um intervalo que será executado a cada 4 segundos
    const interval = setInterval(() => {
      setIsVisible(false); // Torna o texto atual invisível (opacidade 0)
      setTimeout(() => {
        // Após 5 segundos, atualiza o texto a ser exibido
        setDisplayText(texts[index]);
        setIsVisible(true); // Torna o novo texto visível (opacidade 100)
        setIndex((index + 1) % texts.length); // Atualiza o índice, e faz o loop entre os textos
      }, 5000); // Tempo de 5 segundos para esconder o texto atual antes de exibir o novo
    }, 4000); // O intervalo de troca de texto é de 4 segundos

    // Função de limpeza para garantir que o intervalo seja limpo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [texts, index]); // Dependências do useEffect: o componente deve ser reexecutado quando 'texts' ou 'index' mudar

  return (
    // O elemento 'p' exibe o texto com transições de opacidade para criar o efeito de fade
    <p className={`text-lg text-gray-600 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {displayText} {/* Exibe o texto atual */}
    </p>
  );
}
