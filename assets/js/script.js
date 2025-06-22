
// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuButton && mobileMenu) { // Verifica se ambos os elementos existem
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
}


// Scroll to Top Button
const backToTop = document.getElementById('backToTop');
if (backToTop) { // Verifica se o botão existe
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
}

const navbar = document.getElementById('navbar'); // Declarada uma vez, acessível por outras funções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            // Close mobile menu if open
            if(mobileMenu && !mobileMenu.classList.contains('hidden')) { // Verifica mobileMenu antes de usar
                mobileMenu.classList.add('hidden');
            }
            
            // Offset para o navbar fixo, se houver
            const navbarHeight = navbar ? navbar.offsetHeight : 0; // Pega a altura do navbar se ele existir
            
            window.scrollTo({
                top: targetElement.offsetTop - navbarHeight - 20, // Ajuste o 20 conforme necessário para um bom espaçamento
                behavior: 'smooth'
            });
        }
    });
});


// Dynamic Navigation Background
if (navbar) { // Verifica se a navbar existe
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });
}

// Quiz Functionality
const quizQuestions = [
    {
        question: "Qual porcentagem da população brasileira vive em áreas urbanas?",
        options: [
            "Aproximadamente 50%",
            "Aproximadamente 75%",
            "Aproximadamente 65%",
            "Aproximadamente 86%"
        ],
        correct: 3
    },
    {
        question: "Qual destes alimentos tem o maior caminho do campo à cidade em média no Brasil?",
        options: [
            "Alface",
            "Arroz",
            "Bovinos",
            "Ovos"
        ],
        correct: 2
    },
    {
        question: "Qual tecnologia está sendo mais usada recentemente no campo?",
        options: [
            "Drones para monitoramento",
            "Tratores movidos a vapor",
            "Robôs para colheita manual",
            "Plantio em prateleiras verticais"
        ],
        correct: 0
    },
    {
        question: "Quanto em média um alimento perde de seu valor ao passar por intermediários?",
        options: [
            "5-10%",
            "15-30%",
            "40-60%",
            "70-90%"
        ],
        correct: 2
    },
    {
        question: "Qual destes não é um benefício da conexão direta entre campo e cidade?",
        options: [
            "Alimentos mais frescos",
            "Preços mais altos para o consumidor",
            "Renda mais justa para o produtor",
            "Redução de desperdício"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0; // Para pontuação, se desejar implementar a lógica de acertos
const quizContainer = document.getElementById('quizContainer');

// Declarando as variáveis do DOM para o quiz que serão reatribuídas
let quizQuestionWrapper;
let nextQuestionBtn;
let quizProgress;

// A função que inicia ou reinicia o quiz, renderizando a estrutura inicial
function initializeQuizStructure() {
    if (!quizContainer) return; // Garante que o quizContainer exista

    quizContainer.innerHTML = `
        <div class="mb-8" id="quizQuestion">
            </div>
        <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500 high-contrast:text-high-contrast-text" id="quizProgress"></span>
            <button class="bg-primary hover:bg-dark text-white font-bold py-2 px-6 rounded-full transition" id="nextQuestion">Próxima</button>
        </div>
    `;
    
    // RE-OBTÉM E RE-ATRIBUI as referências para os elementos recém-criados
    quizQuestionWrapper = document.getElementById('quizQuestion');
    nextQuestionBtn = document.getElementById('nextQuestion');
    quizProgress = document.getElementById('quizProgress');

    // Remove event listener anterior para evitar duplicação
    if (nextQuestionBtn) { // Verifica se nextQuestionBtn existe antes de tentar remover o listener
        nextQuestionBtn.removeEventListener('click', handleNextQuestion); 
        // Re-adiciona o event listener ao botão 'Próxima'
        nextQuestionBtn.addEventListener('click', handleNextQuestion);
    }
}


function loadQuestion(index) {
    if (!quizQuestionWrapper || !quizProgress || !nextQuestionBtn) {
       
        console.error("Elementos do quiz não encontrados. Certifique-se de que o HTML base do quiz está presente e initializeQuizStructure foi chamada.");
        return; 
    }

    const question = quizQuestions[index];
    
    quizQuestionWrapper.innerHTML = `
        <h3 class="text-xl font-bold text-primary mb-4 high-contrast:text-high-contrast-primary">${index + 1}. ${question.question}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${question.options.map((option, i) => `
                <button class="quiz-option bg-white p-4 rounded-lg border border-gray-200 text-left hover:border-primary transition" data-index="${i}">${option}</button>
            `).join('')}
        </div>
    `;
    
    quizProgress.textContent = `Pergunta ${index + 1} de ${quizQuestions.length}`;
    
    if(index === quizQuestions.length - 1) {
        nextQuestionBtn.textContent = 'Finalizar';
    } else {
        nextQuestionBtn.textContent = 'Próxima';
    }
    
    // Adiciona o event listener a cada opção recém-criada
    quizQuestionWrapper.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove seleção de todas as opções
            quizQuestionWrapper.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('bg-secondary', 'text-white');
                // Garante que as classes de alto contraste sejam removidas ao desselecionar
                opt.classList.remove('high-contrast:bg-high-contrast-primary', 'high-contrast:text-high-contrast-bg', 'high-contrast:border-high-contrast-primary');
                // Adiciona de volta a borda padrão de alto contraste se o modo estiver ativo
                if (document.body.classList.contains('high-contrast')) {
                    opt.classList.add('high-contrast:border-high-contrast-text');
                }
            });
            
            // Adiciona seleção à opção clicada
            this.classList.add('bg-secondary', 'text-white');
            // Adiciona classes para o tema de alto contraste quando selecionado
            if (document.body.classList.contains('high-contrast')) {
                this.classList.remove('high-contrast:border-high-contrast-text'); // Remove borda padrão
                this.classList.add('high-contrast:bg-high-contrast-primary', 'high-contrast:text-high-contrast-bg', 'high-contrast:border-high-contrast-primary');
            }
        });
    });
}

function handleNextQuestion() {

    
    currentQuestion++;
    
    if(currentQuestion < quizQuestions.length) {
        loadQuestion(currentQuestion);
    } else {
        // Quiz finished
        quizContainer.innerHTML = `
            <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check-circle text-primary text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold text-primary mb-2">Quiz Concluído!</h3>
                <p class="text-gray-600 mb-6">Obrigado por testar seus conhecimentos sobre a conexão entre campo e cidade.</p>
                <button id="restartQuiz" class="bg-primary hover:bg-dark text-white font-bold py-2 px-6 rounded-full transition">Refazer Quiz</button>
            </div>
        `;
        
        // Adiciona listener para o botão "Refazer Quiz" APÓS ele ser criado no DOM
        const restartQuizBtn = document.getElementById('restartQuiz');
        if (restartQuizBtn) {
            restartQuizBtn.addEventListener('click', function() {
                currentQuestion = 0;
                score = 0; // Reseta a pontuação
                initializeQuizStructure(); // Recria a estrutura do quiz
                loadQuestion(0); // Carrega a primeira pergunta
            });
        }
    }
}

// Inicializa o quiz SOMENTE se o quizContainer existir na página
if (quizContainer) {
    initializeQuizStructure(); // 1. Inicializa a estrutura do quiz e obtém as referências
    loadQuestion(0);           // 2. Carrega a primeira pergunta após a estrutura estar pronta
}


// Intersection Observer for Section Animations
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target); // Deixa de observar depois de visível
        }
    });
}, {threshold: 0.1});

sections.forEach(section => {
    sectionObserver.observe(section);
});


// Load More Gallery Items
const loadMoreBtn = document.getElementById('loadMoreGallery');
if(loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        alert('Mais itens seriam carregados aqui em uma implementação completa!');
    });
}

// Share Your Story Button
const shareStoryBtn = document.getElementById('shareYourStory');
if(shareStoryBtn) {
    shareStoryBtn.addEventListener('click', function() {
        window.location.href = '#contact'; // Redireciona para a seção de contato
    });
}

// Focus styles for keyboard navigation (melhora acessibilidade)
document.addEventListener('keyup', function(e) {
    if(e.key === 'Tab') {
        document.body.classList.add('user-tabbing'); // Adiciona classe para estilos de foco visíveis
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('user-tabbing'); // Remove classe se o usuário usar o mouse
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