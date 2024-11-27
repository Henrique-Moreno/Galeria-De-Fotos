import Image from "next/image"; // Importa o componente Image do Next.js para otimizar o carregamento das imagens
import { LogIn, UserPlus } from 'lucide-react'; // Importa os ícones LogIn e UserPlus da biblioteca Lucide React

export default function Home() { // Definindo o componente funcional Home
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 text-center">
      {/* Container principal usando flexbox para alinhar os itens no centro */}
      
      <h1 className="text-4xl font-bold text-foreground">
        Capture Momentos Inesquecíveis
      </h1>
      {/* Título principal da página com tamanho grande e fonte em negrito */}
      
      <p className="text-lg text-foreground max-w-lg">
        Descubra, compartilhe e celebre suas melhores memórias com nossa galeria de fotos. 
        Junte-se a nós e comece a sua jornada visual hoje mesmo!
      </p>
      {/* Descrição do site, com texto grande e largura máxima definida para manter a responsividade */}
      
      <Image
        src="https://images.unsplash.com/photo-1506058774676-6360aa0c1584?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Uma bela paisagem" // Texto alternativo para a imagem, importante para acessibilidade
        width={500} // Largura da imagem em pixels
        height={400} // Altura da imagem em pixels
        className="rounded-lg object-cover" // Adiciona bordas arredondadas e faz a imagem cobrir o espaço do container
      />
      {/* Componente Image do Next.js para carregar uma imagem otimizada a partir de uma URL */}

      <div className="flex gap-4">
        {/* Container para os botões, com flexbox e espaçamento entre eles */}
        
        <a
          href="/auth/login"
          className="flex items-center gap-2 rounded-full border border-solid border-transparent transition-colors bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          <LogIn className="w-4 h-4" /> {/* Ícone de Login, com tamanho definido */}
          Fazer Login
        </a>
        {/* Link para a página de login, com estilos de botão e transições de cor */}
        
        <a
          href="/auth/signup"
          className="flex items-center gap-2 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-background text-foreground hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          <UserPlus className="w-4 h-4" /> {/* Ícone de Criar Conta */}
          Criar Conta
        </a>
        {/* Link para a página de criação de conta, com estilos de botão e transições de cor */}
      </div>
    </div>
  );
}
