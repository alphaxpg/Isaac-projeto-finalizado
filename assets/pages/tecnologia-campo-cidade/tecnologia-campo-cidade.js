
// Trava de segurança para todo o código
document.addEventListener('DOMContentLoaded', function() {

    // --- CÓDIGO COMUM A VÁRIAS PÁGINAS ---

    // Menu móvel
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Botão de voltar ao topo
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Código do Botão de Feedback
    const openModalBtn = document.getElementById('openFeedbackModal');
    const closeModalBtn = document.getElementById('closeFeedbackModal');
    const modal = document.getElementById('feedbackModal');
    const feedbackForm = document.getElementById('feedbackForm');
    const successToast = document.getElementById('success-toast');

    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
    }
    const closeModal = () => { if (modal) { modal.style.display = 'none'; } }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (modal) {
        modal.addEventListener('click', (event) => { if (event.target === modal) { closeModal(); } });
    }
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const form = event.target;
            const data = new FormData(form);
            const submitButton = form.querySelector('button');
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            fetch('https://formspree.io/f/xrbkajoq', {
                method: 'POST',
                body: data,
                headers: {'Accept': 'application/json'}
            }).then(response => {
                if (response.ok) {
                    closeModal();
                    form.reset();
                    if (successToast) {
                        successToast.classList.add('show');
                        setTimeout(() => { successToast.classList.remove('show'); }, 3000);
                    }
                } else {
                    alert('Oops! Houve um problema ao enviar seu feedback.');
                }
            }).catch(error => {
                alert('Erro ao enviar. Verifique sua conexão.');
            }).finally(() => {
                submitButton.textContent = 'Enviar';
                submitButton.disabled = false;
            });
        });
    }

    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        // Lógica do quiz
        const quizQuestions = [
            { question: "Qual tecnologia permite o monitoramento preciso de plantações usando imagens aéreas?", options: ["Sensores de Solo", "Drones Agrícolas", "Robôs de Colheita", "Irrigação por Gotejamento"], correct: 1 },
            { question: "O que significa IoT no contexto da agricultura?", options: ["Internet das Coisas", "Integração de Operações Tecnológicas", "Inovação no Campo", "Indicadores de Otimização"], correct: 0 },
            { question: "Qual destes benefícios a agricultura de precisão NÃO proporciona?", options: ["Redução no uso de água", "Aumento no uso de agrotóxicos", "Otimização de insumos", "Monitoramento em tempo real"], correct: 1 },
            { question: "Qual tecnologia permite rastrear a origem dos alimentos?", options: ["Big Data", "Blockchain", "Inteligência Artificial", "Robótica"], correct: 1 },
            { question: "Qual destes é um exemplo de tecnologia para agricultura urbana?", options: ["Tratores autônomos", "Fazendas verticais", "Pulverizadores aéreos", "Colheitadeiras inteligentes"], correct: 1 }
        ];

        let currentQuestion = 0;
        let score = 0;

        function loadQuestion() {
            // (código para carregar a questão)
            const question = quizQuestions[currentQuestion];
            document.getElementById('quizQuestion').innerHTML = `
                <h3 class="text-xl font-bold text-primary mb-4 high-contrast:text-high-contrast-primary">${currentQuestion + 1}. ${question.question}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${question.options.map((option, index) => `<button class="quiz-option bg-white p-4 rounded-lg border border-gray-200 text-left hover:border-primary transition" data-index="${index}">${option}</button>`).join('')}
                </div>`;
            document.getElementById('quizProgress').textContent = `Pergunta ${currentQuestion + 1} de ${quizQuestions.length}`;
            document.querySelectorAll('.quiz-option').forEach(button => {
                button.addEventListener('click', function() {
                    const selectedIndex = parseInt(this.getAttribute('data-index'));
                    if (selectedIndex === question.correct) { score++; this.classList.add('bg-green-100', 'border-green-500');} else { this.classList.add('bg-red-100', 'border-red-500'); }
                    document.querySelectorAll('.quiz-option').forEach(btn => {
                        btn.disabled = true;
                        if (parseInt(btn.getAttribute('data-index')) === question.correct) { btn.classList.add('bg-green-100', 'border-green-500'); }
                    });
                    document.getElementById('nextQuestion').textContent = 'Próxima';
                });
            });
        }

        document.getElementById('nextQuestion').addEventListener('click', function() {
            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                loadQuestion();
                this.textContent = 'Próxima';
            } else {
                document.getElementById('quizContainer').innerHTML = `
                    <div class="text-center">
                        <h3 class="text-2xl font-bold text-primary mb-4">Quiz Concluído!</h3>
                        <p class="text-gray-600 mb-6">Você acertou ${score} de ${quizQuestions.length} perguntas.</p>
                        <button class="bg-primary hover:bg-dark text-white font-bold py-2 px-6 rounded-full transition" id="restartQuiz">Refazer Quiz</button>
                    </div>`;
                document.getElementById('restartQuiz').addEventListener('click', function() {
                    currentQuestion = 0; score = 0; loadQuestion();
                });
            }
        });
        loadQuestion();
    }
});

