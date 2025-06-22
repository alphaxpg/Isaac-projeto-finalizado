// Envolve tudo em um listener para garantir que a página carregou
document.addEventListener('DOMContentLoaded', function() {

    // =======================================================
    //  CÓDIGO COMUM 
    // =======================================================

    // Menu Móvel
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Botão Voltar ao Topo
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        backToTop.addEventListener('click', function(e) {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // Botão de Feedback 
    const openModalBtn = document.getElementById('openFeedbackModal');
    const closeModalBtn = document.getElementById('closeFeedbackModal');
    const modal = document.getElementById('feedbackModal');
    const feedbackForm = document.getElementById('feedbackForm');
    const successToast = document.getElementById('success-toast');

    const closeFeedbackModal = () => {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeFeedbackModal);
    }
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeFeedbackModal();
            }
        });
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
                    closeFeedbackModal();
                    form.reset();
                    if (successToast) {
                        successToast.classList.add('show');
                        setTimeout(() => {
                            successToast.classList.remove('show');
                        }, 3000);
                    } else {
                        alert('Feedback enviado com sucesso!');
                    }
                } else {
                    alert('Oops! Houve um problema ao enviar seu feedback.');
                }
            }).catch(error => {
                console.error('Erro de rede:', error);
                alert('Erro ao enviar. Verifique sua conexão.');
            }).finally(() => {
                submitButton.textContent = 'Enviar';
                submitButton.disabled = false;
            });
        });
    }


    // =======================================================
    //  CÓDIGO ESPECÍFICO DA PÁGINA
    // =======================================================
    
    // Trava de segurança para o Quiz: só executa se a página tiver o quizContainer
    const quizContainer = document.getElementById('quizContainer');
    if(quizContainer) {
        // Cole aqui a lógica do quiz ESPECÍFICO desta página
        // Exemplo:
        const quizQuestions = [
            // ... suas perguntas e respostas aqui ...
        ];
        // ... sua lógica para carregar questões, verificar respostas, etc. ...
    }
    
});