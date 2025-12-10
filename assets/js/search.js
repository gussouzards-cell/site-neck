/**
 * Sistema de Busca no Site
 * Busca simples em todas as páginas
 */

(function() {
    'use strict';
    
    // Índice de busca (pode ser expandido)
    const searchIndex = {
        'matrículas': ['index.html#formulario', 'Matrículas Abertas'],
        'matricula': ['index.html#formulario', 'Matrículas Abertas'],
        'vagas': ['index.html#formulario', 'Vagas Limitadas'],
        'sobre': ['sobre-nos.html', 'Sobre Nós'],
        'história': ['historia.html', 'Nossa História'],
        'educação': ['educacao.html', 'Educação'],
        'galeria': ['galeria.html', 'Galeria de Fotos'],
        'fotos': ['galeria.html', 'Galeria de Fotos'],
        'atividades': ['educacao.html', 'Atividades Extracurriculares'],
        'balé': ['educacao.html', 'Aula de Balé'],
        'judô': ['educacao.html', 'Aula de Judô'],
        'libras': ['educacao.html', 'Aula de Libras'],
        'inglês': ['educacao.html', 'Aula de Inglês'],
        'maker': ['educacao.html', 'Atividade Maker'],
        'contato': ['chat.html', 'Fale Conosco'],
        'telefone': ['chat.html', 'Contato'],
        'whatsapp': ['chat.html', 'WhatsApp'],
        'localização': ['mapa.html', 'Localização'],
        'endereço': ['mapa.html', 'Endereço'],
        'calendário': ['calendario.html', 'Calendário Escolar'],
        'blog': ['blog.html', 'Blog'],
        'faq': ['faq.html', 'Perguntas Frequentes'],
        'calculadora': ['calculadora.html', 'Calculadora de Mensalidade'],
        'agendamento': ['agendamento.html', 'Agendar Visita'],
        'área do aluno': ['area-aluno.html', 'Área do Aluno'],
        'jogos': ['area-aluno.html', 'Jogos Educativos']
    };
    
    // Criar barra de busca
    function createSearchBar() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <button class="search-toggle" aria-label="Buscar no site">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="search-modal">
                <div class="search-modal-overlay"></div>
                <div class="search-modal-content">
                    <div class="search-input-wrapper">
                        <input type="text" class="search-input" placeholder="Buscar no site..." autocomplete="off">
                        <button class="search-close" aria-label="Fechar busca">×</button>
                    </div>
                    <div class="search-results"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(searchContainer);
        
        const searchToggle = searchContainer.querySelector('.search-toggle');
        const searchModal = searchContainer.querySelector('.search-modal');
        const searchInput = searchContainer.querySelector('.search-input');
        const searchResults = searchContainer.querySelector('.search-results');
        const searchClose = searchContainer.querySelector('.search-close');
        const overlay = searchContainer.querySelector('.search-modal-overlay');
        
        // Abrir busca
        searchToggle.addEventListener('click', () => {
            searchModal.classList.add('active');
            searchInput.focus();
        });
        
        // Fechar busca
        function closeSearch() {
            searchModal.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
        
        searchClose.addEventListener('click', closeSearch);
        overlay.addEventListener('click', closeSearch);
        
        // Buscar ao digitar
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query, searchResults);
            }, 300);
        });
        
        // Atalho de teclado (Ctrl+K ou Cmd+K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchToggle.click();
            }
            
            if (e.key === 'Escape' && searchModal.classList.contains('active')) {
                closeSearch();
            }
        });
    }
    
    function performSearch(query, resultsContainer) {
        const results = [];
        
        // Buscar no índice
        for (const [key, value] of Object.entries(searchIndex)) {
            if (key.includes(query) || query.includes(key)) {
                results.push({
                    title: value[1],
                    url: value[0],
                    match: key
                });
            }
        }
        
        // Renderizar resultados
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-no-results">
                    <p>Nenhum resultado encontrado para "<strong>${query}</strong>"</p>
                    <p class="search-suggestion">Tente buscar por: matrículas, sobre, galeria, contato</p>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = results.map(result => `
                <a href="${result.url}" class="search-result-item">
                    <h4>${result.title}</h4>
                    <span class="search-result-url">${result.url}</span>
                </a>
            `).join('');
        }
    }
    
    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createSearchBar);
    } else {
        createSearchBar();
    }
})();

