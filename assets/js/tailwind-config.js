
tailwind.config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#386641', // Verde escuro
        secondary: '#A7C957', // Verde claro
        accent: '#F2E8CF', // Bege
        dark: '#2B4D31', // Verde mais escuro para hover
        light: '#FFFFFF',
        // Cores para o tema de alto contraste
        'high-contrast-bg': '#000',
        'high-contrast-text': '#fff',
        'high-contrast-primary': '#FFEB3B', // Amarelo vivo para destaque
        'high-contrast-input-bg': '#222',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.9', transform: 'scale(1.02)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.7s ease-out forwards',
        'pulse-slow': 'pulse-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'background-color': 'background-color',
        'colors': 'color, background-color',
      },
      transitionTimingFunction: {
        'ease': 'ease',
      },
      transitionDuration: {
        '300': '0.3s',
      },
      // Adiciona sombra customizada para foco
      boxShadow: {
        'focus-secondary': '0 0 0 3px rgba(167, 201, 87, 0.5)',
      },
    },
  },

  variants: {
    extend: {
      backgroundColor: ['high-contrast'],
      textColor: ['high-contrast'],
      borderColor: ['high-contrast'],
      boxShadow: ['high-contrast', 'focus'],
    },
  },
  plugins: [

    function ({ addVariant, addBase, theme }) {
      // Tema de Alto Contraste
      addVariant('high-contrast', '&.high-contrast');

      addBase({
        // Estas regras são aplicadas no nível base e serão lidas pela CDN.
        'body.high-contrast': {
          backgroundColor: theme('colors.high-contrast-bg'),
          color: theme('colors.high-contrast-text'),
        },
        // Ajustes para elementos específicos dentro do modo de alto contraste
        'body.high-contrast .bg-white, body.high-contrast .bg-accent, body.high-contrast .bg-gray-50, body.high-contrast .bg-light': { // Adicionado .bg-light
          backgroundColor: theme('colors.high-contrast-bg'),
        },
        'body.high-contrast .text-gray-800, body.high-contrast .text-gray-700, body.high-contrast .text-gray-600, body.high-contrast .text-gray-500, body.high-contrast .text-gray-300, body.high-contrast .text-gray-400': { // Adicionado mais variações de cinza
          color: theme('colors.high-contrast-text'),
        },
        'body.high-contrast .text-primary, body.high-contrast .text-secondary, body.high-contrast .text-accent': { // Garante que as cores primárias do tema original mudem
          color: theme('colors.high-contrast-primary'),
        },
        'body.high-contrast .bg-primary, body.high-contrast .bg-dark, body.high-contrast .bg-secondary, body.high-contrast .bg-accent': { // Garante que os backgrounds das cores primárias mudem
            backgroundColor: theme('colors.high-contrast-bg') + ' !important', 
            color: theme('colors.high-contrast-primary') + ' !important', // Use !important
            border: '2px solid ' + theme('colors.high-contrast-primary') + ' !important', // Adiciona borda e !important
            boxShadow: 'none !important', // Remove sombras para alto contraste
        },
        'body.high-contrast .hover\\:bg-dark:hover': { // Exemplo para hover do primary
            backgroundColor: theme('colors.high-contrast-primary') + ' !important',
            color: theme('colors.high-contrast-bg') + ' !important',
        },
        'body.high-contrast nav, body.high-contrast footer, body.high-contrast form, body.high-contrast .shadow-md, body.high-contrast .shadow-lg, body.high-contrast .card-hover, body.high-contrast .rounded-lg': { // Generalizando sombras e bordas
          border: '1px solid ' + theme('colors.high-contrast-text'),
          boxShadow: 'none',
        },
        'body.high-contrast .form-input, body.high-contrast .quiz-option': { // Para inputs e botões de quiz
          backgroundColor: theme('colors.high-contrast-input-bg'),
          color: theme('colors.high-contrast-text'),
          borderColor: theme('colors.high-contrast-text'),
        },
        'body.high-contrast .focus\\:ring-primary:focus': { // Ajusta o ring de foco
            '--tw-ring-color': theme('colors.high-contrast-primary'),
        },
        'body.high-contrast .hover\\:border-primary:hover': { // Ajusta a borda do hover
            borderColor: theme('colors.high-contrast-primary'),
        },
        'body.high-contrast .fa-adjust, body.high-contrast .fa-text-height, body.high-contrast .fa-arrow-up, body.high-contrast .fa-bars, body.high-contrast .fa-tractor, body.high-contrast .fa-shopping-basket, body.high-contrast .fa-microchip, body.high-contrast .fa-book-open, body.high-contrast .fa-graduation-cap, body.high-contrast .fa-seedling, body.high-contrast .fa-phone-alt, body.high-contrast .fa-envelope, body.high-contrast .fa-facebook-f, body.high-contrast .fa-instagram, body.high-contrast .fa-check-circle, body.high-contrast .fa-check': {
            color: theme('colors.high-contrast-primary') + ' !important', // Força cor para ícones
        }
      });

      // Efeito Parallax
      addBase({
        '.parallax': {
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        },
        '@media (max-width: 768px)': {
          '.parallax': {
            backgroundAttachment: 'scroll',
          },
        },
      });

      // Animação da Seção (JS dependente)
      addBase({
        '.section': {
          opacity: '0',
          transform: 'translateY(20px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        },
        '.section.visible': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      });

      // Estilo do Item de Menu
      addBase({
        '.menu-item': {
          position: 'relative',
          paddingBottom: '5px',
        },
        '.menu-item::after': {
          content: '""',
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '0',
          height: '2px',
          backgroundColor: theme('colors.secondary'), // Usa a cor secondary do Tailwind
          transition: 'width 0.3s ease-in-out',
        },
        '.menu-item:hover::after': {
          width: '100%',
        },
        // Ajuste para menu-item em alto contraste
        'body.high-contrast .menu-item::after': {
            backgroundColor: theme('colors.high-contrast-primary'),
        },
      });

      // Botão "Voltar ao Topo" (JS dependente)
      addBase({
        '.back-to-top': {
          opacity: '0',
          visibility: 'hidden',
          transform: 'translateY(20px)',
          transition: 'all 0.3s ease-in-out',
        },
        '.back-to-top.show': {
          opacity: '1',
          visibility: 'visible',
          transform: 'translateY(0)',
        },
      });

      // Efeito Card Hover (adicionado um simples scale para demonstração)
      addBase({
        '.card-hover': {
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        },
        '.card-hover:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        'body.high-contrast .card-hover:hover': {
            transform: 'translateY(-5px)', // Mantém o efeito de translação
            boxShadow: 'none', // Remove a sombra no modo alto contraste
            borderColor: theme('colors.high-contrast-primary'), // Altera a cor da borda no hover
        },
      });
    },
  ],
};