/**
 * Header Component
 * Componente reutilizável para o menu principal
 */

(function() {
    'use strict';
    
    const headerHTML = `
    <!-- Header Fixo -->
    <header class="header-fixed" id="header">
        <div class="container">
            <div class="header-content">
                <div class="logo-container">
                    <a href="index.html" style="display: flex; align-items: center; gap: var(--spacing-xs); text-decoration: none;">
                        <img src="assets/images/logo-colegio-neck.png" alt="Colégio Neck" class="logo" id="logo-img" loading="eager" width="150" height="50">
                    </a>
                </div>
                <nav style="display: flex; gap: var(--spacing-md); align-items: center; flex-wrap: wrap;">
                    <a href="index.html" style="color: var(--color-primary-blue); text-decoration: none; font-weight: 600;">Home</a>
                    
                    <!-- Dropdown Institucional -->
                    <div class="nav-dropdown">
                        <a href="#" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Institucional</a>
                        <div class="dropdown-menu">
                            <a href="sobre-nos.html">Sobre Nós</a>
                            <a href="historia.html">Nossa História</a>
                            <a href="educacao.html">Educação</a>
                            <a href="metodologia.html">Metodologia</a>
                            <a href="galeria.html">Galeria</a>
                            <a href="depoimentos.html">Depoimentos</a>
                            <a href="premios.html">Prêmios</a>
                            <a href="parceiros.html">Parceiros</a>
                        </div>
                    </div>
                    
                    <!-- Dropdown Serviços -->
                    <div class="nav-dropdown">
                        <a href="#" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Serviços</a>
                        <div class="dropdown-menu">
                            <a href="area-aluno.html">Área do Aluno</a>
                            <a href="portal-pais.html">Portal dos Pais</a>
                            <a href="calculadora.html">Calculadora</a>
                            <a href="horarios.html">Horários</a>
                            <a href="cardapio.html">Cardápio</a>
                            <a href="downloads.html">Downloads</a>
                            <a href="agendamento.html">Agendar Visita</a>
                            <a href="biblioteca-virtual.html">Biblioteca Virtual</a>
                        </div>
                    </div>
                    
                    <!-- Dropdown Informações -->
                    <div class="nav-dropdown">
                        <a href="#" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Informações</a>
                        <div class="dropdown-menu">
                            <a href="blog.html">Blog</a>
                            <a href="eventos.html">Eventos</a>
                            <a href="faq.html">FAQ</a>
                            <a href="calendario.html">Calendário</a>
                            <a href="quiz.html">Quiz</a>
                            <a href="newsletter.html">Newsletter</a>
                        </div>
                    </div>
                    
                    <!-- Dropdown Contato -->
                    <div class="nav-dropdown">
                        <a href="#" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Contato</a>
                        <div class="dropdown-menu">
                            <a href="chat.html">Fale Conosco</a>
                            <a href="mapa.html">Localização</a>
                            <a href="trabalhe-conosco.html">Trabalhe Conosco</a>
                        </div>
                    </div>
                    
                    <a href="index.html#formulario" class="btn-cta-header">Matricule agora</a>
                </nav>
                <button class="menu-toggle" id="menu-toggle" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </header>

    <!-- Menu Mobile -->
    <div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>
    <div class="mobile-menu" id="mobile-menu">
        <div class="mobile-menu-content">
            <a href="index.html">Home</a>
            <a href="sobre-nos.html">Sobre Nós</a>
            <a href="historia.html">História</a>
            <a href="educacao.html">Educação</a>
            <a href="metodologia.html">Metodologia</a>
            <a href="galeria.html">Galeria</a>
            <a href="depoimentos.html">Depoimentos</a>
            <a href="area-aluno.html">Área do Aluno</a>
            <a href="portal-pais.html">Portal dos Pais</a>
            <a href="calculadora.html">Calculadora</a>
            <a href="horarios.html">Horários</a>
            <a href="cardapio.html">Cardápio</a>
            <a href="blog.html">Blog</a>
            <a href="eventos.html">Eventos</a>
            <a href="faq.html">FAQ</a>
            <a href="calendario.html">Calendário</a>
            <a href="chat.html">Fale Conosco</a>
            <a href="trabalhe-conosco.html">Trabalhe Conosco</a>
            <a href="index.html#formulario" class="btn-cta-header">Matricule agora</a>
        </div>
    </div>
    `;
    
    function initHeader() {
        // Encontrar onde inserir o header (antes do body ou substituir header existente)
        const existingHeader = document.querySelector('.header-fixed');
        const existingMobileOverlay = document.querySelector('.mobile-menu-overlay');
        const existingMobileMenu = document.querySelector('.mobile-menu');
        const body = document.body;
        
        // Remover elementos existentes
        if (existingMobileOverlay) existingMobileOverlay.remove();
        if (existingMobileMenu) existingMobileMenu.remove();
        if (existingHeader) existingHeader.remove();
        
        // Inserir novo header no início do body
        body.insertAdjacentHTML('afterbegin', headerHTML);
        
        // Destacar página atual no menu
        setTimeout(highlightCurrentPage, 100);
    }
    
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.header-content nav a[href]');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.style.color = 'var(--color-primary-blue)';
                link.style.fontWeight = '600';
            }
        });
        
        // Destacar no dropdown também
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.style.color = 'var(--color-primary-blue)';
                link.style.fontWeight = '600';
            }
        });
    }
    
    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeader);
    } else {
        initHeader();
    }
})();

