// Funções de acessibilidade
document.getElementById('contrastBtn').addEventListener('click', function() {
    document.body.classList.toggle('high-contrast');
    document.querySelectorAll('.high-contrast-text').forEach(el => {
        el.classList.toggle('high-contrast-text');
    });
    document.querySelectorAll('.high-contrast-bg').forEach(el => {
        el.classList.toggle('high-contrast-bg');
    });
    document.querySelectorAll('.high-contrast-primary').forEach(el => {
        el.classList.toggle('high-contrast-primary');
    });
    document.querySelectorAll('.high-contrast-border').forEach(el => {
        el.classList.toggle('high-contrast-border');
    });
    document.querySelectorAll('.high-contrast-shadow-none').forEach(el => {
        el.classList.toggle('high-contrast-shadow-none');
    });
});

document.getElementById('fontSizeBtn').addEventListener('click', function() {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = (currentSize + 1) + 'px';
});

// Botão voltar ao topo
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.classList.remove('hidden');
    } else {
        backToTop.classList.add('hidden');
    }
});

document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Menu mobile
document.getElementById('mobileMenuButton').addEventListener('click', function() {
    document.getElementById('mobileMenu').classList.toggle('hidden');
});

// Fechar menu ao clicar em um item
document.querySelectorAll('#mobileMenu a').forEach(item => {
    item.addEventListener('click', function() {
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});

// Quiz
const quizQuestions = [
    {
        question: "1. Qual porcentagem dos agricultores familiares no Brasil são responsáveis pela maior parte dos alimentos que consumimos?",
        options: [
            "Aproximadamente 30%",
            "Aproximadamente 50%",
            "Aproximadamente 70%",
            "Aproximadamente 90%"
        ],
        correctAnswer: 2
    },
    {
        question: "2. Quantos litros de água são necessários para produzir 1kg de carne bovina?",
        options: [
            "Cerca de 500 litros",
            "Cerca de 1.000 litros",
            "Cerca de 5.000 litros",
            "Cerca de 15.000 litros"
        ],
        correctAnswer: 3
    },
    {
        question: "3. Qual é a distância média que um alimento percorre do campo até a cidade no Brasil?",
        options: [
            "Cerca de 50 km",
            "Cerca de 150 km",
            "Cerca de 500 km",
            "Cerca de 1.000 km"
        ],
        correctAnswer: 1
    },
    {
        question: "4. Qual porcentagem da população brasileira vive em áreas urbanas?",
        options: [
            "Aproximadamente 50%",
            "Aproximadamente 65%",
            "Aproximadamente 75%",
            "Aproximadamente 86%"
        ],
        correctAnswer: 3
    },
    {
        question: "5. Quantas famílias de agricultores familiares existem no Brasil?",
        options: [
            "Cerca de 1 milhão",
            "Cerca de 3 milhões",
            "Cerca de 5 milhões",
            "Cerca de 10 milhões"
        ],
        correctAnswer: 2
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const quizQuestion = document.getElementById('quizQuestion');
    const quizProgress = document.getElementById('quizProgress');
    
    quizQuestion.innerHTML = `
        <h3 class="text-xl font-bold text-green-600 mb-4">${quizQuestions[currentQuestion].question}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${quizQuestions[currentQuestion].options.map((option, index) => `
                <button class="quiz-option bg-white p-4 rounded-lg border border-gray-200 text-left hover:border-green-600 transition" data-answer="${index}">${option}</button>
            `).join('')}
        </div>
    `;
    
    quizProgress.textContent = `Pergunta ${currentQuestion + 1} de ${quizQuestions.length}`;
    
    if (currentQuestion === quizQuestions.length - 1) {
        document.getElementById('nextQuestion').textContent = 'Finalizar';
    } else {
        document.getElementById('nextQuestion').textContent = 'Próxima';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    
    document.getElementById('quizContainer').addEventListener('click', function(e) {
        if (e.target.classList.contains('quiz-option')) {
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.classList.remove('bg-green-100', 'border-green-600');
            });
            
            e.target.classList.add('bg-green-100', 'border-green-600');
            
            const selectedAnswer = parseInt(e.target.getAttribute('data-answer'));
            if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
                score++;
            }
        }
    });
    
    document.getElementById('nextQuestion').addEventListener('click', function() {
        currentQuestion++;
        
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            document.getElementById('quizContainer').innerHTML = `
                <div class="text-center">
                    <h3 class="text-xl font-bold text-green-600 mb-4">Quiz Concluído!</h3>
                    <p class="text-gray-600 mb-6">Você acertou ${score} de ${quizQuestions.length} perguntas.</p>
                    <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition" onclick="location.reload()">Tentar Novamente</button>
                </div>
            `;
        }
    });
});

// Formulário de contato
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simular envio do formulário
    setTimeout(function() {
        document.getElementById('successModal').classList.remove('hidden');
    }, 1000);
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('successModal').classList.add('hidden');
    document.getElementById('contactForm').reset();
});

// Suavizar rolagem para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Efeito parallax
window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax');
    if (parallax) {
        const scrollPosition = window.pageYOffset;
        parallax.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
    }
});

// Animação ao rolar
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-slide-up');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Executar uma vez ao carregar a página

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

