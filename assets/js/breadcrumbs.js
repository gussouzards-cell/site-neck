/**
 * Breadcrumbs (Navegação estrutural)
 * Adiciona breadcrumbs automaticamente nas páginas
 */

(function() {
    'use strict';
    
    const breadcrumbMap = {
        'index.html': [{ name: 'Home', url: 'index.html' }],
        'sobre-nos.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Sobre Nós', url: 'sobre-nos.html' }
        ],
        'historia.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Sobre Nós', url: 'sobre-nos.html' },
            { name: 'Nossa História', url: 'historia.html' }
        ],
        'educacao.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Educação', url: 'educacao.html' }
        ],
        'galeria.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Galeria', url: 'galeria.html' }
        ],
        'area-aluno.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Área do Aluno', url: 'area-aluno.html' }
        ],
        'blog.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Blog', url: 'blog.html' }
        ],
        'faq.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'FAQ', url: 'faq.html' }
        ],
        'calendario.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Calendário', url: 'calendario.html' }
        ],
        'chat.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Fale Conosco', url: 'chat.html' }
        ],
        'calculadora.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Calculadora', url: 'calculadora.html' }
        ],
        'downloads.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Downloads', url: 'downloads.html' }
        ],
        'mapa.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Localização', url: 'mapa.html' }
        ],
        'agendamento.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Agendamento', url: 'agendamento.html' }
        ],
        'quiz.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Quiz', url: 'quiz.html' }
        ],
        'newsletter.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Newsletter', url: 'newsletter.html' }
        ],
        'termos-de-uso.html': [
            { name: 'Home', url: 'index.html' },
            { name: 'Termos de Uso', url: 'termos-de-uso.html' }
        ]
    };
    
    function createBreadcrumbs() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const breadcrumbs = breadcrumbMap[currentPage];
        
        if (!breadcrumbs || breadcrumbs.length <= 1) {
            return; // Não mostrar breadcrumbs na home ou páginas sem mapeamento
        }
        
        const breadcrumbContainer = document.createElement('nav');
        breadcrumbContainer.className = 'breadcrumbs';
        breadcrumbContainer.setAttribute('aria-label', 'Breadcrumb');
        
        const breadcrumbList = document.createElement('ol');
        breadcrumbList.className = 'breadcrumb-list';
        
        breadcrumbs.forEach((crumb, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'breadcrumb-item';
            
            if (index === breadcrumbs.length - 1) {
                // Último item (página atual)
                listItem.setAttribute('aria-current', 'page');
                listItem.innerHTML = `<span>${crumb.name}</span>`;
            } else {
                listItem.innerHTML = `<a href="${crumb.url}">${crumb.name}</a>`;
            }
            
            breadcrumbList.appendChild(listItem);
        });
        
        breadcrumbContainer.appendChild(breadcrumbList);
        
        // Inserir após o header
        const header = document.querySelector('.header-fixed');
        if (header) {
            header.insertAdjacentElement('afterend', breadcrumbContainer);
        }
    }
    
    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createBreadcrumbs);
    } else {
        createBreadcrumbs();
    }
})();

