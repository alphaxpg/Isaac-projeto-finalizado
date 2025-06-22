document.addEventListener('DOMContentLoaded', () => {
    const accessibilityButton = document.getElementById('accessibility-button');
    const accessibilityMenu = document.getElementById('accessibility-menu');
    const accessibilityContainer = document.getElementById('accessibility-container');

    const menuTitleH3 = accessibilityMenu ? accessibilityMenu.querySelector('h3') : null;

    const fontIncreaseBtn = document.getElementById('font-increase');
    const fontDecreaseBtn = document.getElementById('font-decrease');
    const highContrastBtn = document.getElementById('high-contrast');
    const darkModeBtn = document.getElementById('dark-mode');
    
    const resetAccessibilityBtn = document.getElementById('reset-accessibility');

    const mainOptionsPanel = document.getElementById('main-options-panel');
    const daltonismOptionsPanel = document.getElementById('daltonism-options-panel');

    const daltonismToggleBtn = document.getElementById('daltonism-toggle');
    const daltonismFilterButtons = daltonismOptionsPanel ? daltonismOptionsPanel.querySelectorAll('button') : [];

    const mainContentDiv = document.getElementById('main-content-wrapper');

    // Garante que os elementos essenciais existam antes de continuar
    if (!accessibilityButton || !accessibilityMenu || !accessibilityContainer || !mainContentDiv) {
        console.error("Um ou mais elementos HTML do menu de acessibilidade não foram encontrados. O script pode não funcionar corretamente.");
        return;
    }

    // --- VARIÁVEIS DE ESTADO ---
    let currentDaltonismFilter = 'none';
    let isHighContrast = false;
    let isDarkMode = false;

    // --- Lógica de Tamanho de Fonte ---
    const FONT_SIZE_STEP = 2;
    const MIN_FONT_SIZE = 10;
    const MAX_FONT_SIZE = 24;
    let currentFontSize = 16;
    let originalBodyFontSize = 16;

    function applyFontSize(size) {
        document.body.style.fontSize = `${size}px`;
        localStorage.setItem('fontSizePreference', size);
    }

    // Tenta obter o tamanho da fonte original do body via computed style
    originalBodyFontSize = parseFloat(getComputedStyle(document.body).fontSize);
    if (isNaN(originalBodyFontSize) || originalBodyFontSize <= 0) {
        originalBodyFontSize = 16; // Fallback se o valor computado não for válido
    }

    const savedFontSize = localStorage.getItem('fontSizePreference');
    if (savedFontSize) {
        currentFontSize = parseInt(savedFontSize);
        applyFontSize(currentFontSize);
    } else {
        currentFontSize = originalBodyFontSize; // Usa o tamanho original determinado dinamicamente
        applyFontSize(currentFontSize);
    }

    // --- Lógica de Alto Contraste ---
    function applyHighContrast(enable) {
        isHighContrast = enable;
        document.body.classList.toggle('high-contrast', enable);
        localStorage.setItem('highContrastPreference', enable);

        if (enable && isDarkMode) {
            applyDarkMode(false); // Desativa o modo escuro se alto contraste for ativado
        }
    }

    // --- Lógica de Modo Escuro ---
    function applyDarkMode(enable) {
        isDarkMode = enable;
        document.body.classList.toggle('dark-mode', enable);
        localStorage.setItem('darkModePreference', enable);

        if (enable && isHighContrast) {
            applyHighContrast(false); // Desativa alto contraste se modo escuro for ativado
        }
    }

    // Restaura as preferências ao carregar a página
    const savedHighContrast = localStorage.getItem('highContrastPreference');
    if (savedHighContrast === 'true') { applyHighContrast(true); }

    const savedDarkMode = localStorage.getItem('darkModePreference');
    if (savedDarkMode === 'true') { applyDarkMode(true); }

    // --- FUNÇÕES AUXILIARES GERAIS ---

    // Função para fechar o menu de acessibilidade ao clicar fora
    document.addEventListener('click', (event) => {
        // Usa setTimeout para permitir que o evento de clique se propague e abra o menu primeiro
        setTimeout(() => {
            // Verifica se o clique foi fora do contêiner de acessibilidade e se o menu está aberto
            if (!accessibilityContainer.contains(event.target) && accessibilityMenu.classList.contains('show')) {
                accessibilityMenu.classList.remove('show');
                accessibilityMenu.setAttribute('aria-hidden', 'true');
                if (mainOptionsPanel && daltonismOptionsPanel && menuTitleH3) {
                    mainOptionsPanel.classList.remove('hidden');
                    daltonismOptionsPanel.classList.add('hidden');
                    menuTitleH3.textContent = 'Acessibilidade';
                }
            }
        }, 0);
    });

    // Função para criar os filtros SVG para daltonismo
    function createSVGFilter() {
        if (document.getElementById('daltonism-svg-filters')) return; // Evita recriar

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('id', 'daltonism-svg-filters');
        svg.setAttribute('width', '0');
        svg.setAttribute('height', '0');
        svg.style.position = 'absolute';
        svg.style.zIndex = '-1';

        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

        // Deuteranopia Matrix
        const deuteranopiaFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        deuteranopiaFilter.setAttribute('id', 'deuteranopia');
        const feColorMatrixDeuteranopia = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        feColorMatrixDeuteranopia.setAttribute('type', 'matrix');
        feColorMatrixDeuteranopia.setAttribute('values', "0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0 1 0 0 0 0 0 1 0");
        deuteranopiaFilter.appendChild(feColorMatrixDeuteranopia);
        defs.appendChild(deuteranopiaFilter);

        // Protanopia Matrix
        const protanopiaFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        protanopiaFilter.setAttribute('id', 'protanopia');
        const feColorMatrixProtanopia = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        feColorMatrixProtanopia.setAttribute('type', 'matrix');
        feColorMatrixProtanopia.setAttribute('values', "0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0 1 0 0 0 0 0 1 0");
        protanopiaFilter.appendChild(feColorMatrixProtanopia);
        defs.appendChild(protanopiaFilter);

        // Tritanopia Matrix
        const tritanopiaFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        tritanopiaFilter.setAttribute('id', 'tritanopia');
        const feColorMatrixTritanopia = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        feColorMatrixTritanopia.setAttribute('type', 'matrix');
        feColorMatrixTritanopia.setAttribute('values', "1 0 0 0 0 0 0.967 0.033 0 0 0 0.183 0.817 0 0 0 0 0 1 0");
        tritanopiaFilter.appendChild(feColorMatrixTritanopia);
        defs.appendChild(tritanopiaFilter);

        svg.appendChild(defs);
        document.body.appendChild(svg);
    }
    createSVGFilter(); // Chama para criar os filtros SVG ao carregar o DOM

    // Aplica o filtro de daltonismo ao conteúdo principal
    function applyDaltonismFilter(filterType) {
        const filters = ['deuteranopia', 'protanopia', 'tritanopia'];
        // Remove as classes do body primeiro
        document.body.classList.remove(...filters);

        if (filterType !== 'none') {
            document.body.classList.add(filterType); // Adiciona a classe ao body
            // Aplica o filtro SVG ao mainContentDiv (elemento que envolve seu conteúdo principal)
            if (mainContentDiv) {
                mainContentDiv.style.filter = `url(#${filterType})`;
                mainContentDiv.style.webkitFilter = `url(#${filterType})`;
            }
        } else {
            // Remove o filtro do mainContentDiv
            if (mainContentDiv) {
                mainContentDiv.style.filter = 'none';
                mainContentDiv.style.webkitFilter = 'none';
            }
        }
        localStorage.setItem('daltonismPreference', filterType);
    }

    // Restaura a preferência de daltonismo ao carregar
    const savedDaltonism = localStorage.getItem('daltonismPreference');
    if (savedDaltonism) {
        applyDaltonismFilter(savedDaltonism);
    }


    // --- LISTENERS DE EVENTOS ---

    // Abrir/Fechar menu principal
    if (accessibilityButton) {
        accessibilityButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const isMenuOpen = accessibilityMenu.classList.toggle('show');
            accessibilityMenu.setAttribute('aria-hidden', !isMenuOpen);
            if (isMenuOpen) {
                if (mainOptionsPanel && daltonismOptionsPanel && menuTitleH3) {
                    mainOptionsPanel.classList.remove('hidden');
                    daltonismOptionsPanel.classList.add('hidden');
                    menuTitleH3.textContent = 'Acessibilidade';
                }
                accessibilityButton.blur();
            } else {
                if (mainOptionsPanel && daltonismOptionsPanel && menuTitleH3) {
                    mainOptionsPanel.classList.remove('hidden');
                    daltonismOptionsPanel.classList.add('hidden');
                    menuTitleH3.textContent = 'Acessibilidade';
                }
            }
        });
    }

    // Aumentar/Diminuir Fonte
    if (fontIncreaseBtn) {
        fontIncreaseBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            if (currentFontSize < MAX_FONT_SIZE) {
                currentFontSize += FONT_SIZE_STEP;
                applyFontSize(currentFontSize);
            }
        });
    }

    if (fontDecreaseBtn) {
        fontDecreaseBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            if (currentFontSize > MIN_FONT_SIZE) {
                currentFontSize -= FONT_SIZE_STEP;
                applyFontSize(currentFontSize);
            }
        });
    }

    // Alto Contraste
    if (highContrastBtn) {
        highContrastBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            applyHighContrast(!isHighContrast);
        });
    }

    // Modo Escuro
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            applyDarkMode(!isDarkMode);
        });
    }

    // Reiniciar Todas as Configurações de Acessibilidade
    if (resetAccessibilityBtn) {
        resetAccessibilityBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            resetAllAccessibilitySettings();
            if (menuTitleH3) {
                menuTitleH3.textContent = 'Acessibilidade';
            }
        });
    }

    function resetAllAccessibilitySettings() {
        currentFontSize = originalBodyFontSize;
        applyFontSize(currentFontSize);
        localStorage.removeItem('fontSizePreference');

        applyDaltonismFilter('none'); // Reseta o filtro de daltonismo
        localStorage.removeItem('daltonismPreference');

        applyHighContrast(false);
        localStorage.removeItem('highContrastPreference');

        applyDarkMode(false);
        localStorage.removeItem('darkModePreference');

        if (mainOptionsPanel && daltonismOptionsPanel) {
            mainOptionsPanel.classList.remove('hidden');
            daltonismOptionsPanel.classList.add('hidden');
        }
    }

    // Mostrar PAINEL de Opções de Daltonismo
    if (daltonismToggleBtn) {
        daltonismToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            if (mainOptionsPanel && daltonismOptionsPanel && menuTitleH3) {
                mainOptionsPanel.classList.add('hidden');
                daltonismOptionsPanel.classList.remove('hidden');
                menuTitleH3.textContent = 'Daltonismo';
            }
        });
    }

    // Aplicar Filtros de Daltonismo
    daltonismFilterButtons.forEach(keyButton => {
        keyButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const filterType = event.currentTarget.dataset.filter;
            applyDaltonismFilter(filterType);

            if (filterType === 'none') {
                if (daltonismOptionsPanel && mainOptionsPanel && menuTitleH3) {
                    daltonismOptionsPanel.classList.add('hidden');
                    mainOptionsPanel.classList.remove('hidden');
                    menuTitleH3.textContent = 'Acessibilidade';
                }
            }
        });
    });
});