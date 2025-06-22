
document.addEventListener('DOMContentLoaded', () => {
    // === Menu Mobile ===
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // === Botão Voltar ao Topo ===
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === Acessibilidade: Alto Contraste ===
    const contrastBtn = document.getElementById('contrastBtn');
    const body = document.body;

    // Função para aplicar/remover alto contraste
    const toggleHighContrast = (enable) => {
        if (enable) {
            body.classList.add('high-contrast');
            localStorage.setItem('highContrast', 'enabled');
        } else {
            body.classList.remove('high-contrast');
            localStorage.setItem('highContrast', 'disabled');
        }
    };

    // Verifica a preferência ao carregar a página
    if (localStorage.getItem('highContrast') === 'enabled') {
        toggleHighContrast(true);
    }

    if (contrastBtn) {
        contrastBtn.addEventListener('click', () => {
            toggleHighContrast(!body.classList.contains('high-contrast'));
        });
    }

    // === Acessibilidade: Aumentar/Diminuir Fonte ===
    const fontSizeBtn = document.getElementById('fontSizeBtn');
    const FONT_SIZE_NORMAL = 16; // Tamanho base da fonte em px
    const FONT_SIZE_LARGE = 18;  // Tamanho aumentado da fonte em px
    
    // Elementos que terão o tamanho da fonte ajustado
    const scalableElementsSelector = 'body, p, span, a, li, button, h1, h2, h3, h4, h5, h6';

    const setFontSize = (size) => {
        document.querySelectorAll(scalableElementsSelector).forEach(el => {
            // Evitar mudar o tamanho de ícones ou elementos com tamanhos fixos CSS
            // Você pode refinar isso adicionando mais condições se necessário.
            // Ex: if (!el.classList.contains('fa-icon') && !el.style.fontSize)
            if (el.dataset.originalFontSize === undefined) {
                 // Armazena o tamanho original do elemento antes da primeira alteração
                 const computedSize = window.getComputedStyle(el, null).getPropertyValue('font-size');
                 el.dataset.originalFontSize = parseFloat(computedSize);
            }

            if (size === 'normal') {
                el.style.fontSize = ''; // Volta ao padrão CSS
            } else if (size === 'large') {
                // Calcula o novo tamanho com base no original (não no já modificado)
                el.style.fontSize = `${parseFloat(el.dataset.originalFontSize) * (FONT_SIZE_LARGE / FONT_SIZE_NORMAL)}px`;
            }
        });
        localStorage.setItem('fontSize', size);
    };

    // Verifica a preferência ao carregar a página
    if (localStorage.getItem('fontSize') === 'large') {
        setFontSize('large');
    }

    if (fontSizeBtn) {
        fontSizeBtn.addEventListener('click', () => {
            if (localStorage.getItem('fontSize') === 'large') {
                setFontSize('normal');
            } else {
                setFontSize('large');
            }
        });
    }

    // === Formulário de Contato ===
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    
    if (contactForm && successModal && closeModal) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envio do formulário
            setTimeout(() => {
                contactForm.reset(); // Limpa o formulário
                successModal.classList.remove('hidden'); // Mostra o modal
            }, 500); // Pequeno atraso para simular o envio
        });
        
        closeModal.addEventListener('click', () => {
            successModal.classList.add('hidden'); // Esconde o modal
        });
    }

    // === Links dos Projetos e Nossa História (Alertas Temporários) ===
    const projetoLinks = ['projeto1', 'projeto2', 'projeto3', 'projeto4', 'projeto5', 'projeto6'];
    projetoLinks.forEach(id => {
        const link = document.getElementById(id);
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Esta página está em desenvolvimento. Em breve você poderá conhecer mais sobre este projeto!');
            });
        }
    });

    const nossaHistoriaLink = document.getElementById('nossaHistoria');
    if (nossaHistoriaLink) {
        nossaHistoriaLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Esta página está em desenvolvimento. Em breve você poderá conhecer mais sobre nossa história!');
        });
    }

    // === Scroll Suave para Links Âncora ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight; // Obtém a altura da navbar
                const offsetPosition = targetElement.offsetTop - navbarHeight; // Calcula a posição com offset
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto após clicar em um link interno
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // === Efeito de Mudança na Navbar ao Rolar ===
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
        });
    }
});

// =======================================================
//  CÓDIGO PARA O BOTÃO DE FEEDBACK
// =======================================================
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona todos os elementos que vamos usar
    const openModalBtn = document.getElementById('openFeedbackModal');
    const closeModalBtn = document.getElementById('closeFeedbackModal');
    const modal = document.getElementById('feedbackModal');
    const feedbackForm = document.getElementById('feedbackForm');
    const successToast = document.getElementById('success-toast');

    // Checa se os elementos existem antes de adicionar os eventos
    if (openModalBtn && modal) {
        // Abre o modal
        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }
    
    // Função para fechar o modal
    const closeModal = () => {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        // Fecha o modal se o usuário clicar na área escura (overlay)
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Lida com o envio do formulário
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const form = event.target;
            const data = new FormData(form);
            const submitButton = form.querySelector('button');

            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            // Envia os dados para o link do Formspree
            fetch('https://formspree.io/f/xrbkajoq', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    closeModal();
                    form.reset();
                    
                    if (successToast) {
                        successToast.classList.add('show');
                        setTimeout(() => {
                            successToast.classList.remove('show');
                        }, 3000);
                    } else {
                        alert('Feedback enviado com sucesso! Muito obrigado.');
                    }
                } else {
                    alert('Oops! Houve um problema ao enviar seu feedback.');
                }
            }).catch(error => {
                console.error('Erro de rede:', error);
                alert('Erro ao enviar. Verifique sua conexão com a internet.');
            }).finally(() => {
                submitButton.textContent = 'Enviar';
                submitButton.disabled = false;
            });
        });
    }
});

