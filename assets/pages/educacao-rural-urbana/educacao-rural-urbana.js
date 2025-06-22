// Menu Mobile
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Botão de Voltar ao Topo
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Botão de Alto Contraste
const contrastBtn = document.getElementById('contrastBtn');

contrastBtn.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    
    // Salvar preferência no localStorage
    if (document.body.classList.contains('high-contrast')) {
        localStorage.setItem('highContrast', 'enabled');
    } else {
        localStorage.setItem('highContrast', 'disabled');
    }
});

// Verificar preferência de alto contraste ao carregar a página
if (localStorage.getItem('highContrast') === 'enabled') {
    document.body.classList.add('high-contrast');
}

// Botão de Aumentar Fonte
const fontSizeBtn = document.getElementById('fontSizeBtn');
let fontSizeIncreased = false;

fontSizeBtn.addEventListener('click', () => {
    const elements = document.querySelectorAll('body, p, span, a, li, button');
    
    if (fontSizeIncreased) {
        elements.forEach(el => {
            el.style.fontSize = '';
        });
        fontSizeIncreased = false;
        localStorage.setItem('fontSize', 'normal');
    } else {
        elements.forEach(el => {
            const currentSize = window.getComputedStyle(el, null).getPropertyValue('font-size');
            const newSize = parseFloat(currentSize) * 1.2;
            el.style.fontSize = `${newSize}px`;
        });
        fontSizeIncreased = true;
        localStorage.setItem('fontSize', 'large');
    }
});

// Verificar preferência de tamanho de fonte ao carregar a página
if (localStorage.getItem('fontSize') === 'large') {
    fontSizeBtn.click(); // Simula o clique para aumentar a fonte
}

// Formulário de Contato
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simular envio do formulário
    setTimeout(() => {
        contactForm.reset();
        successModal.classList.remove('hidden');
    }, 1000);
});

closeModal.addEventListener('click', () => {
    successModal.classList.add('hidden');
});

// Links dos projetos
const projetoLinks = ['projeto1', 'projeto2', 'projeto3', 'projeto4', 'projeto5', 'projeto6'];

projetoLinks.forEach(id => {
    document.getElementById(id).addEventListener('click', (e) => {
        e.preventDefault();
        alert('Esta página está em desenvolvimento. Em breve você poderá conhecer mais sobre este projeto!');
    });
});

// Link Nossa História
document.getElementById('nossaHistoria').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Esta página está em desenvolvimento. Em breve você poderá conhecer mais sobre nossa história!');
});

// Quiz
const quizQuestions = [
    {
        question: "1. Qual a porcentagem das escolas brasileiras está localizada em áreas rurais?",
        options: ["Aproximadamente 15%", "Aproximadamente 25%", "Aproximadamente 35%", "Aproximadamente 45%"],
        correct: 1
    },
    {
        question: "2. Qual o principal desafio enfrentado pelas escolas rurais?",
        options: ["Falta de infraestrutura", "Dificuldade de acesso", "Falta de professores qualificados", "Todos os anteriores"],
        correct: 3
    },
    {
        question: "3. Qual iniciativa ajuda a conectar escolas rurais e urbanas?",
        options: ["Intercâmbio de estudantes", "Uso de tecnologia educacional", "Programas de formação de professores", "Todos os anteriores"],
        correct: 3
    },
    {
        question: "4. Qual porcentagem da população brasileira vive em áreas urbanas?",
        options: ["65%", "75%", "85%", "95%"],
        correct: 2
    },
    {
        question: "5. Qual o benefício da integração entre educação rural e urbana?",
        options: ["Troca de conhecimentos", "Valorização da diversidade", "Desenvolvimento sustentável", "Todos os anteriores"],
        correct: 3
    }
];

const quizContainer = document.getElementById('quizContainer');
const quizQuestion = document.getElementById('quizQuestion');
const quizProgress = document.getElementById('quizProgress');
const nextQuestionBtn = document.getElementById('nextQuestion');
let currentQuestion = 0;
let score = 0;

function loadQuestion(index) {
    const question = quizQuestions[index];
    quizQuestion.innerHTML = `
        <h3 class="text-xl font-bold text-primary mb-4 high-contrast:text-high-contrast-primary">${question.question}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${question.options.map((option, i) => `
                <button class="quiz-option bg-white p-4 rounded-lg border border-gray-200 text-left hover:border-primary transition high-contrast:bg-high-contrast-bg high-contrast:border high-contrast:border-high-contrast-text high-contrast:text-high-contrast-text high-contrast:hover:border-high-contrast-primary" data-answer="${i}">${option}</button>
            `).join('')}
        </div>
    `;
    
    quizProgress.textContent = `Pergunta ${index + 1} de ${quizQuestions.length}`;
    
    if (index === quizQuestions.length - 1) {
        nextQuestionBtn.textContent = 'Ver Resultado';
    } else {
        nextQuestionBtn.textContent = 'Próxima';
    }
    
    // Adicionar eventos aos botões de opção
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', selectAnswer);
    });
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const answer = parseInt(selectedBtn.getAttribute('data-answer'));
    const correctAnswer = quizQuestions[currentQuestion].correct;
    
    // Remover todas as classes de feedback primeiro
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.classList.remove('bg-green-100', 'border-green-500', 'bg-red-100', 'border-red-500');
        btn.disabled = false;
    });
    
    // Desabilitar todos os botões após seleção
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.disabled = true;
    });
    
    // Mostrar feedback
    if (answer === correctAnswer) {
        selectedBtn.classList.add('bg-green-100', 'border-green-500');
        score++;
    } else {
        selectedBtn.classList.add('bg-red-100', 'border-red-500');
        // Mostrar a resposta correta
        document.querySelector(`.quiz-option[data-answer="${correctAnswer}"]`).classList.add('bg-green-100', 'border-green-500');
    }
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        loadQuestion(currentQuestion);
    } else {
        // Mostrar resultado
        quizQuestion.innerHTML = `
            <h3 class="text-xl font-bold text-primary mb-4 high-contrast:text-high-contrast-primary">Quiz Concluído!</h3>
            <p class="text-gray-600 mb-6 high-contrast:text-high-contrast-text">Você acertou ${score} de ${quizQuestions.length} perguntas.</p>
            <p class="text-gray-600 mb-6 high-contrast:text-high-contrast-text">${score >= 3 ? 'Parabéns! Você conhece bem sobre educação rural e urbana.' : 'Continue aprendendo sobre educação rural e urbana!'}</p>
        `;
        quizProgress.textContent = '';
        nextQuestionBtn.textContent = 'Tentar Novamente';
        nextQuestionBtn.removeEventListener('click', nextQuestion);
        nextQuestionBtn.addEventListener('click', resetQuiz);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion(currentQuestion);
    nextQuestionBtn.removeEventListener('click', resetQuiz);
    nextQuestionBtn.addEventListener('click', nextQuestion);
}

// Inicializar quiz
loadQuestion(currentQuestion);
nextQuestionBtn.addEventListener('click', nextQuestion);

// Suavizar rolagem para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se estiver aberto
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
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
